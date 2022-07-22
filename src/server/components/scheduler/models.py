import uuid

from django.conf import settings
from django.db import models

from components.integration.models import Engine


class Task(models.Model):
    """ model for ads from integration sites """
    class Status(models.TextChoices):
        new = 'new'
        in_progress = 'in_progress'
        done = 'done'

    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    integration_engine = models.ForeignKey(to=Engine, on_delete=models.SET_NULL, null=True)

    original_link = models.URLField(unique=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    phones = models.CharField(max_length=255, blank=True, null=True)
    picture = models.URLField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)
    price = models.PositiveIntegerField()

    upload_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.new)
    is_enabled = models.BooleanField(default=True)

    def __str__(self):
        return f'#{self.guid}: {self.title}'


class TaskInProgress(models.Model):
    manager = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(to=Task, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'manager {self.manager.login} took the task "{self.task}" to work on {self.order_date.date()}'
