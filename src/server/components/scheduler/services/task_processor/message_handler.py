from typing import Optional
from django.contrib.auth.models import User

from components.scheduler.models import Task


class TaskMessage:

    TYPE_FIELD = 'type'
    MESSAGE_FIELD = 'message'
    USER_FIELD = 'user'
    TASK_FIELD = 'task'

    _type: str = None
    _message: Optional[str] = None
    _user: User = None
    _task: Task = None

    def __init__(self, message_data: dict):
        self._type = message_data.get(TaskMessage.TYPE_FIELD)
        self._message = message_data.get(TaskMessage.MESSAGE_FIELD)
        self._user = self.__load_user_from_message_by_token(
            token=message_data.get(TaskMessage.USER_FIELD)
        )
        self._task = self.__load_task_by_uuid(
            task_uuid=message_data.get(TaskMessage.TASK_FIELD)
        )


    @property
    def type(self):
        return self._type

    @property
    def message(self):
        return self._message

    @property
    def user(self):
        return self._user

    def task(self):
        return self._task

    def __load_user_from_message_by_token(self, token) -> User: ...

    def __load_task_by_uuid(self, task_uuid) -> Task: ...


class TaskProcessing:

    def parse_message(self, message) -> TaskMessage:
        return TaskMessage(message_data=message)