"""config URL Configuration"""

from django.contrib import admin
from django.urls import path, include

from components.scheduler.endpoint.views import WebsocketConnectionTest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('components.common.http_routes')),
    path('test', WebsocketConnectionTest.as_view()),
    path('', include('components.common.oauth.urls')),
]
