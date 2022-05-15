from channels.routing import URLRouter
from django.urls import path

from components.scheduler.services.ws_notification import NotificationConsumer

urlpatterns = URLRouter([
    path('sockets/v1/', URLRouter([
        path('notification', NotificationConsumer.as_asgi()),
    ])),
])
