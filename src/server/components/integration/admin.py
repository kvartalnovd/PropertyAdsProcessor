from django.contrib import admin

from . import models


@admin.register(models.Engine)
class EngineAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name', 'engine_name', 'last_update')
    list_display_links = ('name',)
