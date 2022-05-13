from django.conf import settings
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from components.common.oauth.endpoint.views import UserView
from components.scheduler.services.ws_notification import NotificationConsumer

schema_view = get_schema_view(
    openapi.Info(
        title="PropertyAdsProcessor",
        default_version='v1',
        description="application for processing  based on Django 4.0 & Django REST Framework",
        contact=openapi.Contact(url="https://processor.io/contact")
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

websocket_urlpatterns = [
    path('ws/notification', NotificationConsumer.as_asgi())
]

urlpatterns = [
    path('oauth/', include('components.common.oauth.urls')),
    path('user', UserView.as_view({'get': 'retrieve', 'put': 'update'})),
]

if settings.DEBUG:
    urlpatterns += [
        path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
