import uuid

from django.db import models


class Engine(models.Model):
    name = models.CharField(max_length=40)
    engine_name = models.CharField(max_length=24)
    description = models.TextField(max_length=2000, blank=True, null=True)
    last_update = models.DateTimeField(blank=True, null=True)

    base_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.engine_name}'
