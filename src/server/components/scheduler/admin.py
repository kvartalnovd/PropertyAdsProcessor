from django.contrib import admin

from . import models


@admin.register(models.Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('guid', 'integration_engine', 'title', 'upload_date', 'is_enabled', 'status')
    list_display_links = ('guid', 'title')


@admin.register(models.TaskInProgress)
class AuthorAdmin(admin.ModelAdmin):
    pass
