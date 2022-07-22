from bs4 import Tag

from components.parser.engines.base_engine import BaseParserEngine
from components.parser.entities import AdvertisementData


class Place(BaseParserEngine):

    def parse_ad_block(self, ad_block: Tag) -> AdvertisementData:
        pass

    def get_page_url(self, page: int) -> str:
        pass