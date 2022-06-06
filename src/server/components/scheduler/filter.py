from django_filters import rest_framework as filters

from components.scheduler import models


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter): ...

class TaskFilter(filters.FilterSet):
    # upload_date = CharFilterInFilter(field_name="genres__name", lookup_expr='in')
    # date = filters.RangeFilter()
    upload = filters.DateTimeFromToRangeFilter(field_name='upload_date')

    class Meta:
        model = models.Task
        fields = ['upload']
