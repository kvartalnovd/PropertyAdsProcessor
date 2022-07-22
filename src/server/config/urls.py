"""config URL Configuration"""

from django.contrib import admin
from django.urls import path, include

from components.scheduler.endpoint.views import WebsocketConnectionTest, ParserTest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('config.routes.api')),
    path('test', WebsocketConnectionTest.as_view()),
    path('parser', ParserTest.as_view()),
]
