from django.conf import settings
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from components.scheduler.endpoint.task_view import TasksListView, TaskDetailView

schema_view = get_schema_view(
    openapi.Info(
        title="Property ads processor",
        default_version='v1',
        description="application for processing  based on Django 4.0 & Django REST Framework",
        contact=openapi.Contact(url="https://processor.io/team/contact")
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

urlpatterns = [
    # Django REST Framework authentication
    path('auth/', include('rest_framework.urls')),

    # JWT routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Ads
    path('tasks', TasksListView.as_view()),
    path('tasks/<str:pk>', TaskDetailView.as_view()),
]

if settings.DEBUG:
    urlpatterns += [
        path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
