from requests import Response
from typing import List, Tuple
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod
import grequests


socket_message = {
    'user': 'Token <token>',
    'task': '<uuid4>',
    'type': 'change_status',
    'details': {
        'status': 'new|in_progress|done'
    },
}


socket_message = {
    'user': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NTIxNTU4LCJpYXQiOjE2NTQ1MjEyNTgsImp0aSI6IjY3NmIwMWFlYmE1NjQ4ZTNiYmE0YzRiNTdhZGY1NTkyIiwidXNlcl9pZCI6Mn0.gf-oXlQXwoTlBa_lBEY4XBvlz2ARV5NjN2rGsHUhruo',
    'task': '8c247f99-fff1-4e6d-9846-64114154a707',
    'type': 'change_status',
    'details': {
        'status': 'in_progress'
    },
}






class TaskMessageDetail:

    def __init__(self, details: dict) -> None:
        self.__status = details.get('status')

    def status(self):
        return self.__status


class TaskNotificationMessage:

    def __init__(self, message: dict) -> None:
        self.__task = message.get('task')
        self.__type = message.get('type')
        self.__token = message.get('token')
        self.__details = TaskMessageDetail(message.get('details'))

    @property
    def task(self):
        return self.__task

    @property
    def token(self):
        return self.__token

    @property
    def type_(self):
        return self.__type

    @property
    def details(self):
        return self.__details


class AdBlock:

    def __init__(self, block):
        self.__html_block = block

    def save(self): ...


class ParserCore(ABC):


    def __init__(self): ...


class BaseParser:

    def update(self): ...

    def save(self): ...

    def __load_links(self) -> List[str]: ...

    def __request_by_links(self, links: List[str]) -> Response: ...

    def __parse_responses_loads(self, responses): ...

    def __parse_response(self, response: Response): ...

    def __create_chuncked_loop(self): ...
