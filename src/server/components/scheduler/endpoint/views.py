from django.shortcuts import render
from django.views import View


class WebsocketConnectionTest(View):
    """ Test connection of websocket asgi """

    def get(self, request, *args, **kwargs):
        return render(request, template_name='index.html')
