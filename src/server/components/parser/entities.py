from datetime import datetime
from typing import Tuple
from urllib.parse import urlparse, urlunparse, quote

from components.integration.models import Engine
from components.scheduler.models import Task
from components.parser.utils import normalize_url, normalize_phones


class AdvertisementDataUpdate:

    def __init__(self,
                 phones: Tuple[int | str] | None = None,
                 picture: str | None = None,
                 date: datetime | None = None,
                 is_vip: bool = False) -> None:
        self.__phones = phones
        self.__picture = picture
        self.__date = date
        self.__is_vip = is_vip

    @property
    def phones(self) -> str | None:
        if isinstance(self.__phones, str):
            return self.__phones
        return ','.join(map(str, self.__phones))

    @property
    def picture(self) -> str | None:
        return self.__picture

    @property
    def date(self) -> datetime | None:
        return self.__date

    @property
    def is_vip(self) -> bool:
        return self.__is_vip


class AdvertisementData:

    def __init__(self, original_link: str | None = None,
                 phones: str | None = None,
                 picture: str | None = None,
                 date: datetime | None = None,
                 price: int | None = None) -> None:
        self.__original_link = normalize_url(original_link) if original_link else None
        self.__phones = normalize_phones(phones) if phones else None
        self.__picture: str = normalize_url(picture) if picture else None
        self.__date: datetime | None = date
        self.__price: int | None = price

    @property
    def original_link(self) -> str | None:
        return self.__original_link

    @original_link.setter
    def original_link(self, link: str):
        self.__original_link = normalize_url(link)

    @property
    def phones(self) -> str | None:
        return self.__phones

    @phones.setter
    def phones(self, phones: str):
        self.__phones = normalize_phones(phones)

    @property
    def picture(self) -> str | None:
        return self.__picture

    @picture.setter
    def picture(self, picture: str):
        self.__picture = normalize_url(picture)

    @property
    def date(self) -> datetime | None:
        return self.__date

    @date.setter
    def date(self, date: datetime):
        self.__date = date

    @property
    def price(self) -> datetime | None:
        return self.__price

    @price.setter
    def price(self, date: datetime):
        self.__price = date


    def merge_with_advertisement_page(self, ad_page: AdvertisementDataUpdate) -> None:
        if ad_page.phones:
            self.__phones = normalize_phones(ad_page.phones)
        if ad_page.picture:
            self.__picture = normalize_url(ad_page.picture)
        if ad_page.date:
            self.__date = ad_page.date
        if ad_page.is_vip:
            self.__is_vip = ad_page.is_vip

    def is_data_correct(self) -> bool:
        if not self.original_link:
            return False
        return True

    def safe_save(self) -> bool:
        """ Safe saving ad to database.
            Return True if ad saved to database and False if it has been already existed """
        _, created = Task.objects.get_or_create(
            integration_engine=self.__integration_engine,
            original_link=self.__original_link,
            phones=self.__phones,
            picture=self.__picture,
            date=self.__date,
            is_vip=self.__is_vip
        )
        return not created
