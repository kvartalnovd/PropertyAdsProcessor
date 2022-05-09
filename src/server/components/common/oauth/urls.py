from django.urls import path

from .endpoint import auth_views

urlpatterns = [
	path('token', auth_views.Token.as_view()),
]
