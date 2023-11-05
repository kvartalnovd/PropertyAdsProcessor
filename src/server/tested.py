from datetime import datetime

import requests
from typing import Tuple

from bs4 import BeautifulSoup
from bs4.element import ResultSet, Tag



url = 'https://ss.ge/ru/Недвижимость/l?page=2'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
ad_block_selector = '.DesktopArticleLayout .latest_left'


# def find_ad_blocks_by_css_path(soup: BeautifulSoup, css_path: str) -> Tuple[Tag]:
#
#     css_classes = css_path.split('.')
#     result_blocks = soup.select("div.DesktopArticleLayout")
    # document.querySelector("#list > div:nth-child(5) > div.latest_article_each_in > div.DesktopArticleLayout > div.latest_left > div.latest_desc > div:nth-child(1) > a > div > span")
    # #list > div:nth-child(5) > div.latest_article_each_in > div.DesktopArticleLayout > div.latest_left > div.latest_desc > div:nth-child(1) > a > div > span

def find_ad_blocks_by_css_selector(soup: BeautifulSoup, css_path: str) -> Tuple[Tag]: ...
    #list > div:nth-child(5) > div.latest_article_each_in > div.DesktopArticleLayout > div.latest_left > div.latest_desc > div:nth-child(1) > a > div > span


def find_blocks(soup: BeautifulSoup) -> Tuple[Tag]:
    # blocks = (block.select_one('div.latest_left') for block in soup.select("div.latest_article_each"))

    # css_path_to_ad_block = 'latest_article_each.DesktopArticleLayout.latest_left'
    # blocks = find_ad_blocks_by_css_path(css_path_to_ad_block)

    # TiTleSpanList
    return tuple(soup.select(ad_block_selector))

def parse_block(block: Tag) -> dict:
    # data = block.select_one('div.DesktopArticleLayout').select_one('div.latest_left')
    print(block.prettify())
    original_link = block.select_one('')

    return {
        'original_link': 'http://vk.com/ss.ge/',
        'phones': (89671234412,),
        'picture': f'/images/7b642dc3-70d3-4d1a-95f9-55da10f6cca9.jpg',
        'date': datetime(2022, 6, 6),
        'is_vip': False
    }


if __name__ == '__main__':
    blocks = find_blocks(soup)
    print(len(blocks))
    parsed_ad = parse_block(blocks[0])

    # print(type(blocks[0]))
    # with open('ss_ad_block_example.html', 'w') as file:
    #     file.write(blocks[0].prettify())
