from datetime import datetime
from typing import Tuple
from urllib.parse import urlparse, urlunparse, quote

from components.integration.models import Engine
from components.scheduler.models import Task


def normalize_url(url: str) -> str:
    parts = urlparse(url)
    return urlunparse(parts._replace(path=quote(parts.path)))

def normalize_phones(phones: str | tuple) -> str:
    if isinstance(phones, str):
        return phones
    return ','.join(map(str, phones))


class ParsedAdBlock:

    def __init__(self,
                 original_link: str,
                 phones: Tuple[int, str] | None = None,
                 picture: str | None = None,
                 date: datetime | None = None,
                 is_vip: bool = False) -> None:
        self.__original_link = normalize_url(original_link)
        self.__phones = phones
        self.__picture = normalize_url(picture)
        self.__date = date
        self.__is_vip = is_vip

    @property
    def original_link(self):
        return self.__original_link

    @property
    def phones(self):
        if isinstance(self.__phones, str):
            return self.__phones
        return ','.join(map(str, self.__phones))

    @property
    def picture(self):
        return self.__picture

    @property
    def date(self):
        return self.__date

    @property
    def is_vip(self) -> bool:
        return self.__is_vip


class AdvertisementDataUpdate:

    def __init__(self,
                 phones: Tuple[int | str] | None = None,
                 picture: str | None = None,
                 date: datetime | None = None,
                 is_vip: bool = False) -> None:
        self.__phones = phones
        self.__picture = normalize_url(picture)
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

    def __init__(self,
                 engine: Engine,
                 original_link: str,
                 phones: str | None = None,
                 picture: str | None = None,
                 date: datetime | None = None,
                 is_vip: bool = False) -> None:
        self.__integration_engine = engine
        self.__original_link = normalize_url(original_link)
        self.__phones = normalize_phones(phones)
        self.__picture = normalize_url(picture)
        self.__date = date
        self.__is_vip = is_vip

    @property
    def original_link(self):
        return self.__original_link

    @property
    def phones(self) -> str | None:
        return self.__phones

    @property
    def picture(self) -> str | None:
        return self.__picture

    @property
    def date(self) -> datetime | None:
        return self.__date

    @property
    def is_vip(self) -> bool:
        return self.__is_vip

    def merge_with_advertisement_page(self, ad_page: AdvertisementDataUpdate) -> None:
        if ad_page.phones:
            self.__phones = self.normalize_phones(ad_page.phones)
        if ad_page.picture:
            self.__picture = self.normalize_url(ad_page.picture)
        if ad_page.date:
            self.__date = ad_page.date
        if ad_page.is_vip:
            self.__is_vip = ad_page.is_vip

    def is_data_correct(self) -> bool:
        if not self.__integration_engine:
            return False
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

    @classmethod
    def normalize_url(cls, url: str) -> str:
        parts = urlparse(url)
        return urlunparse(parts._replace(path=quote(parts.path)))

    @classmethod
    def normalize_phones(cls, phones: str | tuple) -> str:
        if isinstance(phones, str):
            return phones
        return ','.join(map(str, phones))
