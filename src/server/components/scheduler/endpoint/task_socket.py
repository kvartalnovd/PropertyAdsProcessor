import json
from channels.generic.websocket import AsyncWebsocketConsumer

from components.scheduler.services.message.receive import ReceiveMessage


class TaskNotificationConsumer(AsyncWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.group_name = None
        self.user = None

    async def connect(self):
        self.group_name = 'task_watchers'
        self.user = self.scope["user"]
        print(f'{self.user} has been connected')
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        json_raw = '{"id": 123, "name": "James"}'
        user_dict = json.loads(json_raw)
        user = User(**user_dict)


        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        received_data = ReceiveMessage(**text_data)


        event = {
            'type': 'send_message',
            'message': message
        }
        await self.channel_layer.group_send(self.group_name, event)

    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))

    def __check_user(self):
        username_str = None
        username = self.scope["user"]
        if username.is_authenticated():
            username_str = username.username
            print(type(username_str))