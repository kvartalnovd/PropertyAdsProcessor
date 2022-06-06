from rest_framework import serializers

from components.scheduler import models


class TaskSerializer(serializers.ModelSerializer):
    # guid = serializers.CharField(read_only=True)

    class Meta:
        model = models.Task
        fields = ('original_link', 'phones', 'picture', 'upload_date')

    def create(self, validated_data):
        return models.Task(**validated_data)


class TasksListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Task
        fields = ('guid', 'original_link', 'phones', 'picture', 'status', 'is_enabled', 'upload_date')

class TaskDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Task
        fields = ('guid', 'title', 'original_link', 'phones', 'picture', 'status', 'is_enabled', 'upload_date')
