import math
from abc import ABC, abstractmethod, abstractstaticmethod
from datetime import datetime
from typing import Tuple
from urllib.parse import urlparse, urljoin, parse_qs

import grequests
import requests
from bs4 import BeautifulSoup, PageElement

from components.integration.models import Engine
from components.integration.services.parser.entities import AdvertisementData, AdvertisementDataUpdate, ParsedAdBlock


class ParseEngineException(IOError):
    ...

class BreakParseProcessing(ParseEngineException):
    ...

class BaseUrlNotFound(ParseEngineException):
    ...


def async_request_exception_handler(request, exception):
    print("Request failed")


class ParserEngineCore(ABC):

    DEFAULT_REQUEST_WORKERS = 16
    DEFAULT_REQUEST_PER_CHUNK_COUNT = 5
    DEFAULT_MAX_PAGES_COUNT_FOR_PROCESSING = 10
    DEFAULT_AD_BLOCKS_ON_PAGE = (10, 100)

    def __init__(self) -> None:
        self.__meta = getattr(self, 'Meta', None)
        self.__request_fields = getattr(self, 'Request', None)
        self.__integration_model: Engine | None = self.__load__integration_model()

    @property
    def request_workers(self) -> int:
        if self.__meta and hasattr(self.__meta, 'request_workers'):
            return int(self.__meta.request_workers)
        return ParserEngineCore.DEFAULT_REQUEST_WORKERS

    @property
    def request_per_chunk(self) -> int:
        if self.__meta and hasattr(self.__meta, 'request_per_chunk'):
            return int(self.__meta.request_per_chunk)
        return ParserEngineCore.DEFAULT_REQUEST_PER_CHUNK_COUNT

    @property
    def max_pages_count_for_processing(self) -> int:
        if self.__meta and hasattr(self.__meta, 'max_pages'):
            return int(self.__meta.max_pages)
        return ParserEngineCore.DEFAULT_MAX_PAGES_COUNT_FOR_PROCESSING

    @property
    def engine_name(self):
        return self.__class__.__name__

    @property
    def integration_model(self) -> Engine:
        return self.__integration_model

    @property
    def base_url(self) -> str:
        if self.__integration_model and self.__integration_model.base_url:
            return str(self.__integration_model.base_url)

        if self.__meta and hasattr(self.__meta, 'base_url'):
            return str(self.__meta.base_url)

        raise BaseUrlNotFound

    @property
    def need_parse_individual_ad_pages(self) -> bool:
        if hasattr(self, 'parse_ad_block'):
            # @TODO: Добавить проверку, переписывался ли метод "parse_ad_block"
            if self.__meta and hasattr(self.__meta, 'parse_ad_block'):
                return bool(self.__meta.need_parse_individual_ad_pages)
            return True
        return False

    @property
    def ad_blocks_on_page(self) -> tuple|int:
        if self.__meta and hasattr(self.__meta, 'ad_blocks_on_page'):
            return bool(self.__meta.ad_blocks_on_page)
        return ParserEngineCore.DEFAULT_AD_BLOCKS_ON_PAGE

    @abstractmethod
    def get_page_url(self, page: int) -> str:
        ...

    @abstractmethod
    def find_ad_blocks(self, soup: BeautifulSoup) -> tuple:
        ...

    @abstractmethod
    def parse_ad_block(self, ad_block: str) -> AdvertisementData:
        ...

    # def parse_ad_page(self, ad_block: PageElement) -> ParsedAd | None: ...

    def smartparse(self) -> None:
        for chunk in range (math.ceil(self.max_pages_count_for_processing / self.request_per_chunk)):
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

        parsed_ad_blocks = []
        for ad_block in ad_blocks:

            advertisement_data = self.parse_ad_block(ad_block)
            if self.need_parse_individual_ad_pages:
                advertisement_page_data = self.__parse_individual_ad_page(url=advertisement_data.original_link)
                advertisement_data.merge_with_advertisement_page(ad_page=advertisement_page_data)

            if advertisement_data.is_data_correct():
                parsed_ad_blocks.append(advertisement_data)

        return tuple(parsed_ad_blocks)

    def __prepare_request(self, url: str) -> dict:
        parsed_url = urlparse(url)

        request_data = {
            'url': urljoin(url, parsed_url.path),
            'params': parse_qs(parsed_url.query)
        }

        if self.__request_fields:
            if hasattr(self.__request_fields, 'cookies' and isinstance(self.__request_fields.cookies, dict)):
                request_data['cookies'] = self.__request_fields.cookies
            if hasattr(self.__request_fields, 'params') and isinstance(self.__request_fields.params, dict):
                request_data['params'] = request_data['params'] | self.__request_fields.params

        return request_data

    def __parse_individual_ad_page(self, url: str) -> AdvertisementDataUpdate | None:
        if hasattr(self, 'parse_ad_page'):
            request = self.__prepare_request(url)
            response = requests.get(**request)

            ad_page_soup = BeautifulSoup(response.content, 'html.parser')
            parsed_page = self.parse_ad_page(url, ad_page_soup)

            return self.parse_ad_page(ad_page_soup)
        return None

    def __merge_ad_page_in_ad_block(self, ad_block: ParsedAdBlock, ad_page: AdvertisementDataUpdate):
        mergeable_attributes = ('phones', 'picture', 'date', 'is_vip')
        phones, picture, date, is_vip = (getattr(ad_page, attr) if getattr(ad_page, attr) else getattr(ad_block, attr)
                                         for attr in mergeable_attributes)
        return self.create_advertisement_data(
            original_link=ad_block.original_link,
            phones=phones,
            picture=picture,
            date=date,
            is_vip=is_vip
        )
