import json
from uuid import UUID

from pydantic import BaseModel

from components.scheduler.models import Task


class ReceiveMessage(BaseModel):
    task: UUID
    type: str
    new_status: str


class ResponseMessage(BaseModel):
    user: str
    task: UUID
    new_status: str


class MessageHandler:

    def __init__(self, message, user) -> None:
        self.__data = ReceiveMessage(**json.loads(message))
        self.__user = user

    def handle(self) -> ResponseMessage:
        task = Task.objects.get(guid=self.__data.task)
        available_statuses = (status[0] for status in Task.Status.choices)
        if self.__data.new_status in available_statuses:
            task.status = self.__data.new_status
        else: ...
            # return some ERROR

        return ResponseMessage(
            user=self.__user,
            task=task.guid,
            new_status=task.status
        )

# socket_message = {
#     'task': '<uuid4>',
#     'type': 'change_status',
#     'details': {
#         'status': 'new|in_progress|done'
#     },
# }