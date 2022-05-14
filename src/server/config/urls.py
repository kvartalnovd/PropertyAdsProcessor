"""config URL Configuration"""

from django.contrib import admin
from django.urls import path, include

from components.scheduler.views import WebsocketConnectionTest

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('components.common.routes')),
    path('test', WebsocketConnectionTest.as_view()),
    path('', include('components.common.oauth.urls')),
]
