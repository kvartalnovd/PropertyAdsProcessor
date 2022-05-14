from rest_framework import serializers

from components.common.oauth import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AuthUser
        fields = ('login', 'email', 'country', 'city', 'join_date')
