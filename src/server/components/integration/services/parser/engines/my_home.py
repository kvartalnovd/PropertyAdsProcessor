from components.integration.services.parser.engines.core import ParserEngineCore


LANG_RU = 'ru'
LANG_EN = 'en'
LANG_KA = 'ka'

VIEW_GRID_CARD = 'card'
VIEW_GRID_LIST = 'list'

COOKIE_CURRENCY_FIELD = 'is_gel'
CURRENCY_GEORGIAN_LARI_ID = 1
CURRENCY_US_DOLLAR_ID = 0


class MyHome(ParserEngineCore):

    class Meta:
        base_url = 'https://www.myhome.ge/ru/s'

    class RequestData:
        cookies = {
            'Lang': LANG_RU,
            'ViewGrid': VIEW_GRID_LIST,
            COOKIE_CURRENCY_FIELD: CURRENCY_GEORGIAN_LARI_ID
        }

    def page_url(self, page: int) -> str:
        return f'{self.base_url}/?Page={page}'
