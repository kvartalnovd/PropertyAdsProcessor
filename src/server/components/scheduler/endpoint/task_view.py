from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, parsers, generics, permissions

from components.scheduler import serializer, models
from components.scheduler.filter import TaskFilter


class TaskView(viewsets.ModelViewSet):
    """ Viewing and editing user data """

    parser_classes = (parsers.MultiPartParser,)
    serializer_class = serializer.TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user

    def get_object(self):
        return self.get_queryset()


class TasksListView(generics.ListAPIView):
    """ Viewing and editing user data """

    # parser_classes = (parsers.MultiPartParser,)
    queryset = models.Task.objects.order_by('-upload_date')
    serializer_class = serializer.TasksListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TaskFilter

    # def get_queryset(self):
    #     _guid = self.request.query_params.get('from_id')
    #     if not _guid:
    #         return models.Task.objects.all()[:10]
    #         # raise ValidationError(detail="Error 400, guid was not provided", code=400)
    #
    #     return models.Task.objects.filter(guid=_guid)


class TaskDetailView(generics.RetrieveAPIView):
    queryset = models.Task.objects.all()
    serializer_class = serializer.TaskDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
