from django.core.validators import FileExtensionValidator
from django.db import models

from components.common.oauth.services.auth_user import AuthUserService
from django.core.validators import MinLengthValidator


class AuthUser(models.Model):
    """User model on the platform"""
    login = models.CharField(max_length=42, validators=[MinLengthValidator(3)], unique=True)
    email = models.EmailField(max_length=150, unique=True)
    join_date = models.DateTimeField(auto_now_add=True)
    country = models.CharField(max_length=30, blank=True, null=True)
    city = models.CharField(max_length=30, blank=True, null=True)
    bio = models.TextField(max_length=2000, blank=True, null=True)
    avatar = models.ImageField(upload_to=AuthUserService.get_path_upload_avatar,
                               blank=True,
                               null=True,
                               validators=[FileExtensionValidator(allowed_extensions=['jpg']),
                                           AuthUserService.validate_avatar_file_size])

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return f'{self.email} ({self.login})'
