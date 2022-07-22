from django.shortcuts import render
from django.views import View

from components.parser.cron import ParserCron


class WebsocketConnectionTest(View):
    """ Test connection of websocket asgi """

    def get(self, request, *args, **kwargs):
        return render(request, template_name='index.html')


class ParserTest(View):
    def get(self, request, *args, **kwargs):
        print('START!')
        parser = ParserCron()
        parser.run()
        return render(request, template_name='index.html')