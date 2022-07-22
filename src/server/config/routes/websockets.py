from channels.routing import URLRouter
from django.urls import path

from components.scheduler.services.ws_notification import NotificationConsumer
from components.scheduler.endpoint.task_socket import TaskNotificationConsumer

urlpatterns = URLRouter([
    path('sockets/v1/', URLRouter([
        path('notification', NotificationConsumer.as_asgi()),
        path('tasks', TaskNotificationConsumer.as_asgi()),
    ])),
])