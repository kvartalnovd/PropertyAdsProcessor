from bs4 import BeautifulSoup, PageElement
from datetime import date, datetime

from components.integration.services.parser.engines.core import ParserEngineCore
from components.integration.services.parser.entities import AdvertisementDataUpdate, AdvertisementData

CURRENCY_GEORGIAN_LARI_ID = 1
CURRENCY_US_DOLLAR_ID = 2

class Ss(ParserEngineCore):

    class Meta:
        base_url = 'https://ss.ge/ru/Недвижимость/l'
        request_per_chunk = 2
        max_pages = 5
        ad_blocks_on_page = 20

    class RequestData:
        cookies = {'CurrencyId': CURRENCY_GEORGIAN_LARI_ID}
        params = {'new': 'ru'}

    def get_page_url(self, page: int) -> str:
        return f'{self.base_url}?page={page}'

    def find_ad_blocks(self, soup: BeautifulSoup) -> tuple:
        return tuple(soup.find_all('div', _class='latest_article_each DesktopArticleLayout'))

    def parse_ad_block(self, ad_block: PageElement) -> AdvertisementData:
        # @TODO: some parsing of ad block

        return self.create_advertisement_data(
            original_link='http://vk.com/ss.ge/',
            phones=(89671234412, ),
            picture=f'{self.base_url}/images/7b642dc3-70d3-4d1a-95f9-55da10f6cca9.jpg',
            date=datetime(2022, 6, 6),
            is_vip=False
        )

    def parse_ad_page(self, ad_page_soup: BeautifulSoup) -> AdvertisementDataUpdate:
        # @TODO: some parsing of ad page
        return self.create_advertisement_data_update(
            phones='24124235235,24829412847128',
            picture=f'{self.base_url}/images/7b642dc3-70d3-4d1a-95f9-55da10f6cca9.jpg',
            date=datetime.now()
        )