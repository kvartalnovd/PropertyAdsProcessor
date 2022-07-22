from bs4 import BeautifulSoup
from bs4.element import Tag

from datetime import datetime

from components.parser.engines.base_engine import BaseParserEngine
from components.parser.entities import AdvertisementDataUpdate, AdvertisementData


CURRENCY_GEORGIAN_LARI_ID = 1
CURRENCY_US_DOLLAR_ID = 2

class Ss(BaseParserEngine):

    class Meta:
        request_per_chunk = 2
        max_pages = 5

        base_url = 'https://ss.ge/ru/Недвижимость/l'
        ad_block_selector = '.DesktopArticleLayout .latest_left'
        ad_blocks_on_page = 20

    class RequestData:
        cookies = {
            'CurrencyId': CURRENCY_GEORGIAN_LARI_ID
        }
        params = {
            'Sort.SortExpression': '"OrderDate" DESC'
        }

    def get_page_url(self, page: int) -> str:
        return f'{self.base_url}?page={page}'

    def parse_ad_block(self, ad_block: Tag) -> AdvertisementData:
        original_link = ad_block.select_one('.latest_left .latest_desc div .a').get_text()
        picture = ad_block.select_one('.list-img-cont .owl-stage-outer .owl-item.active a img').attrs.get('src')
        date = ad_block.select_one('.latest_left .latest_desc .add_time').get_text()
        price = ad_block.select_one('.latest_right .price-spot .latest_price').get_text()

        return AdvertisementData(
            original_link=original_link,
            picture=picture,
            date=date,
            price=price
        )

    # def parse_ad_page(self, ad_page_soup: BeautifulSoup) -> AdvertisementDataUpdate:
    #     # @TODO: some parsing of ad page
    #     return self.create_advertisement_data_update(
    #         phones='24124235235,24829412847128',
    #         picture=f'{self.base_url}/images/7b642dc3-70d3-4d1a-95f9-55da10f6cca9.jpg',
    #         date=datetime.now()
    #     )