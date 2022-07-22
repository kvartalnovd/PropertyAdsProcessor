import math
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Tuple
from urllib.parse import urlparse, urljoin, parse_qs

import grequests
import requests
from bs4 import BeautifulSoup
from bs4.element import Tag

from components.integration.models import Engine
from components.parser.entities import AdvertisementData, AdvertisementDataUpdate
from components.parser.exceptions import BaseUrlNotFound, MetaException


# class ParseEngineException(IOError):
#     ...
#
# class BreakParseProcessing(ParseEngineException):
#     ...
#
# class BaseUrlNotFound(ParseEngineException):
#     ...
#
# class MetaException(ParseEngineException):
#     ...


def async_request_exception_handler(request, exception):
    print("Request failed")


class BaseParserEngine(ABC):

    DEFAULT_REQUEST_WORKERS = 16
    DEFAULT_REQUEST_PER_CHUNK_COUNT = 5
    DEFAULT_MAX_PAGES_COUNT_FOR_PROCESSING = 10
    DEFAULT_AD_BLOCKS_ON_PAGE = (10, 100)

    ATTR_PARSE_AD_PAGE = 'parse_ad_page'

    def __init__(self) -> None:
        self.__engine_name = self.__class__.__name__

        self.__meta = getattr(self, 'Meta', None)
        self.__request_fields = getattr(self, 'Request', None)
        self.__integration_model: Engine | None = self.__load__integration_model()

        self.__request_workers: int = BaseParserEngine.DEFAULT_REQUEST_WORKERS
        self.__request_per_chunk: int = BaseParserEngine.DEFAULT_REQUEST_PER_CHUNK_COUNT
        self.__max_pages_count_for_processing: int = BaseParserEngine.DEFAULT_MAX_PAGES_COUNT_FOR_PROCESSING
        self.__ad_blocks_on_page: int | tuple = BaseParserEngine.DEFAULT_AD_BLOCKS_ON_PAGE

        self.__request_data: dict = {}
        self.__base_url: str | None = None
        self.__ad_block_selector: str | None = None

        if self.__integration_model and self.__integration_model.base_url:
            self.__base_url = str(self.__integration_model.base_url)

        if self.__meta:
            if hasattr(self.__meta, 'request_workers'):
                self.__request_workers = int(self.__meta.request_workers)

            if hasattr(self.__meta, 'request_per_chunk'):
                self.__request_per_chunk =  int(self.__meta.request_per_chunk)

            if hasattr(self.__meta, 'max_pages'):
                self.__max_pages_count_for_processing = int(self.__meta.max_pages)

            if hasattr(self.__meta, 'ad_blocks_on_page'):
                self.__ad_blocks_on_page = bool(self.__meta.ad_blocks_on_page)

            if hasattr(self.__meta, 'base_url'):
                self.__base_url = str(self.__meta.base_url)

            if hasattr(self.__meta, 'ad_block_selector'):
                self.__ad_block_selector = str(self.__meta.ad_block_selector)

        if self.__request_fields:
            if hasattr(self.__request_fields, 'cookies') and isinstance(self.__request_fields.cookies, dict):
                self.__request_data['cookies'] = self.__request_fields.cookies

            if hasattr(self.__request_fields, 'params') and isinstance(self.__request_fields.params, dict):
                self.__request_data['params'] = self.__request_fields.params


    @property
    def engine_name(self):
        return self.__class__.__name__

    @property
    def integration_model(self) -> Engine:
        return self.__integration_model

    @property
    def request_data(self) -> dict:
        return self.__request_data

    @property
    def request_workers(self) -> int:
        return self.__request_workers

    @property
    def request_per_chunk(self) -> int:
        return self.__request_per_chunk

    @property
    def max_pages_count_for_processing(self) -> int:
        return self.__max_pages_count_for_processing

    @property
    def ad_blocks_on_page(self) -> tuple | int:
        return self.__ad_blocks_on_page

    @property
    def base_url(self) -> str:
        if self.__base_url:
            return self.__base_url
        raise BaseUrlNotFound

    @property
    def ad_block_selector(self) -> str:
        if self.__ad_block_selector:
            return self.__ad_block_selector
        raise MetaException('The "Meta" class must have the "ad_block_selector" field to search for ad blocks')

    @property
    def need_parse_individual_ad_pages(self) -> bool:
        if hasattr(self, BaseParserEngine.ATTR_PARSE_AD_PAGE):
            if self.__meta and hasattr(self.__meta, 'enable_parse_ad_page'):
                return bool(self.__meta.need_parse_individual_ad_pages)
            return True
        return False

    @abstractmethod
    def get_page_url(self, page: int) -> str:
        ...

    @abstractmethod
    def parse_ad_block(self, ad_block: Tag) -> AdvertisementData:
        ...

    # def parse_ad_page(self, ad_block: PageElement) -> ParsedAd | None: ...

    def smartparse(self) -> None:

        for chunk in range(math.ceil(self.__max_pages_count_for_processing / self.__request_per_chunk)):
            start_page = (chunk * self.__request_per_chunk) + 1
            end_page = ((chunk + 1) * self.__request_per_chunk) + 1
            if end_page >= self.__max_pages_count_for_processing + 1:
                end_page = self.__max_pages_count_for_processing + 1

            urls = self.__load_urls_bunch(start_page, end_page)
            async_requests = (grequests.get(**self.__prepare_request(url)) for url in urls)

            for response in grequests.map([async_requests],
                                          size=self.request_workers,
                                          exception_handler=async_request_exception_handler):
                soup = BeautifulSoup(response.content, 'html.parser')
                parsed_ad_blocks = self.__parse_page(soup)
                for parsed_ad_block in parsed_ad_blocks:
                    parsed_ad_block.safe_save()

        # OLD:
        for chunk in range(math.ceil(self.max_pages_count_for_processing / self.request_per_chunk)):
            start_page = (chunk * self.request_per_chunk) + 1
            end_page = ((chunk + 1) * self.request_per_chunk) + 1
            if end_page >= self.max_pages_count_for_processing + 1:
                end_page = self.max_pages_count_for_processing + 1

            urls = self.__load_urls_bunch(start_page, end_page)
            async_requests = (grequests.get(**self.__prepare_request(url)) for url in urls)

            for response in grequests.map([async_requests],
                                          size=self.request_workers,
                                          exception_handler=async_request_exception_handler):
                soup = BeautifulSoup(response.content, 'html.parser')
                parsed_ad_blocks = self.__parse_page(soup)
                for parsed_ad_block in parsed_ad_blocks:
                    is_need_continue_processing = parsed_ad_block.safe_save()
                    if not is_need_continue_processing:
                        return

    def find_ad_blocks(self, soup: BeautifulSoup) -> Tuple[Tag]:
        """ The method finds all ad blocks on a page with a list of ads
        receives: soup from a page with a list of ads
        return: tuple of the Tags as ad blocks
        """
        return tuple(soup.select(self.ad_block_selector))

    def create_advertisement_data(self, original_link: str, phones: Tuple[int | str] | None = None,
                                  picture: str | None = None, date: datetime | None = None,
                                  is_vip: bool = False) -> AdvertisementData:
        return AdvertisementData(
            engine=self.integration_model,
            original_link=original_link,
            phones=phones,
            picture=picture,
            date=date,
            is_vip=is_vip
        )

    def create_advertisement_data_update(self, phones: Tuple[int | str] | str | None = None, picture: str | None = None,
                                         date: datetime | None = None, is_vip: bool = False ) -> AdvertisementDataUpdate:
        return AdvertisementDataUpdate(
            phones=phones,
            picture=picture,
            date=date,
            is_vip=is_vip
        )

    def __load__integration_model(self) -> Engine | None:
        return Engine.objects.filter(engine_name=self.engine_name).first()

    def __load_urls_bunch(self, start_page: int, end_page: int) -> Tuple[str]:
        return tuple(map(str, (self.get_page_url(page) for page in range(start_page, end_page))))

    def __parse_page(self, soup: BeautifulSoup) -> Tuple[AdvertisementData]:
        ad_blocks = self.find_ad_blocks(soup)
        self.__check_found_blocks_count(ad_blocks)

        parsed_ad_blocks = []
        for ad_block in ad_blocks:

            advertisement_data = self.parse_ad_block(ad_block)
            if self.need_parse_individual_ad_pages:
                advertisement_page_data = self.__parse_advertisement_page(url=advertisement_data.original_link)
                if isinstance(advertisement_page_data, AdvertisementDataUpdate):
                    advertisement_data.merge_with_advertisement_page(ad_page=advertisement_page_data)

            if advertisement_data.is_data_correct():
                parsed_ad_blocks.append(advertisement_data)

        return tuple(parsed_ad_blocks)

    def __prepare_request(self, url: str) -> dict:
        parsed_url = urlparse(url)

        prepared_request_data = {
            'url': urljoin(url, parsed_url.path),
            'params': parse_qs(parsed_url.query)
        }

        if self.__request_data['params']:
            prepared_request_data['params'] = prepared_request_data['params'] | self.__request_data['params']

        if self.__request_data['cookies']:
            prepared_request_data['cookies'] = self.__request_data['cookies']

        return prepared_request_data

    def __parse_advertisement_page(self, url: str) -> AdvertisementDataUpdate | None:
        if hasattr(self, 'parse_ad_page'):
            request = self.__prepare_request(url)
            response = requests.get(**request)
            ad_page_soup = BeautifulSoup(response.content, 'html.parser')
            return self.parse_ad_page(ad_page_soup)

        return None

    # def __merge_ad_page_in_ad_block(self, ad_block: ParsedAdBlock, ad_page: AdvertisementDataUpdate):
    #     mergeable_attributes = ('phones', 'picture', 'date', 'is_vip')
    #     phones, picture, date, is_vip = (getattr(ad_page, attr) if getattr(ad_page, attr) else getattr(ad_block, attr)
    #                                      for attr in mergeable_attributes)
    #     return self.create_advertisement_data(
    #         original_link=ad_block.original_link,
    #         phones=phones,
    #         picture=picture,
    #         date=date,
    #         is_vip=is_vip
    #     )

    def __check_found_blocks_count(self, blocks: Tuple[Tag]) -> bool:
        if isinstance(self.ad_blocks_on_page, int):
            return len(blocks) == self.ad_blocks_on_page
        if isinstance(self.ad_blocks_on_page, tuple):
            if len(self.ad_blocks_on_page) == 1:
                return len(blocks) == self.ad_blocks_on_page[0]
            if len(self.ad_blocks_on_page) == 2:
                return len(blocks) in range(self.ad_blocks_on_page[0], self.ad_blocks_on_page[1] + 1)
        return False
