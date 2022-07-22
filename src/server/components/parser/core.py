import json
import math
from typing import Tuple
from urllib.parse import urlparse, urljoin, parse_qs

import grequests
from bs4 import BeautifulSoup

from components.parser.engines.base_engine import BaseParserEngine
from components.parser.entities import AdvertisementData
from components.parser.exceptions import BreakParseProcessing


def async_request_exception_handler(request, exception):
    print("Request failed")

class Parser:

    def __init__(self, engine: BaseParserEngine) -> None:
        print(f'Парсер активирован | {type(engine)}')
        self.__engine = engine

    def start(self) -> None:
        for chunk in range(math.ceil(self.__engine.max_pages_count_for_processing / self.__engine.request_per_chunk)):
            start_page = (chunk * self.__engine.request_per_chunk) + 1
            end_page = ((chunk + 1) * self.__engine.request_per_chunk) + 1

            if end_page >= self.__engine.max_pages_count_for_processing + 1:
                end_page = self.__engine.max_pages_count_for_processing + 1
            print(f'\n chunk: {chunk} | from {start_page} to {end_page}')

            urls = self.__load_urls_bunch(start_page, end_page)
            async_requests = (grequests.get(**self.__prepare_request(url)) for url in urls)
            print(f'  > Try some urls (count - {len(urls)}): {urls}')

            for response in grequests.map(async_requests,
                                          size=self.__engine.request_workers,
                                          exception_handler=async_request_exception_handler):
                soup = BeautifulSoup(response.content, 'html.parser')
                print(f'   -| loaded soup ')
                ad_blocks = self._page_processing(soup)
                print(f'   -| page processing has been finished')
                try:
                    self.__save_ads(ad_blocks)
                except BreakParseProcessing:
                    print(f' >>> STOP! Parse processing should be end <<<')
                    break

    def _page_processing(self, soup: BeautifulSoup) -> Tuple[AdvertisementData]:
        print(f'    -| start page processing ')
        ad_blocks = self.__engine.find_ad_blocks(soup)
        print(f'    -| found some ad blocks. Total count - {len(ad_blocks)}')
        parsed_ad_blocks = []
        for ad_block in ad_blocks:
            advertisement_data = self.__engine.parse_ad_block(ad_block)
            # if self.need_parse_individual_ad_pages:
            #     advertisement_page_data = self.__parse_advertisement_page(url=advertisement_data.original_link)
            #     if isinstance(advertisement_page_data, AdvertisementDataUpdate):
            #         advertisement_data.merge_with_advertisement_page(ad_page=advertisement_page_data)

            if advertisement_data.is_data_correct():
                parsed_ad_blocks.append(advertisement_data)

        print(f'    -| Final parsed ad data count - {len(parsed_ad_blocks)} ')
        return tuple(parsed_ad_blocks)

    def __load_urls_bunch(self, start_page: int, end_page: int) -> Tuple[str]:
        """ Creating a tuple of a certain number of URL according to pagination """
        return tuple(map(str, (self.__engine.get_page_url(page) for page in range(start_page, end_page))))

    def __prepare_request(self, url: str) -> dict:
        """ Preparing arguments for a requests.get() """
        parsed_url = urlparse(url)

        url = urljoin(url, parsed_url.path)
        params = parse_qs(parsed_url.query)
        cookies = {}

        if self.__engine.request_data['params'] and isinstance(self.__engine.request_data['params'], dict):
            params = params | self.__engine.request_data['params']

        if self.__engine.request_data['cookies'] and isinstance(self.__engine.request_data['cookies'], dict):
            cookies = self.__engine.request_data['cookies']

        return {
            'url': url,
            'params': params,
            'cookies': cookies
        }

    def __save_ads(self, ads_data: Tuple[AdvertisementData]) -> None:
        """ Safe saving ad to database.
            Return True if ad saved to database and False if it has been already existed """
        print(f'   -| Start the saving process for {len(ads_data)} ads data')
        for ad_data in ads_data:
            print(f'    -| loaded soup ')
            print(f'    - json > f{json.dumps(ad_data.__dict__, indent=4, sort_keys=True)}')
            # _, created = Task.objects.get_or_create(
            #     integration_engine=self.__engine.integration_model,
            #     original_link=ad_data.oаriginal_link,
            #     phones=ad_data.phones,
            #     picture=ad_data.picture,
            #     date=ad_data.date,
            #     price=ad_data.price
            # )
            # if not created:
            #     raise BreakParseProcessing
        print(f'   -| Save process finished')
