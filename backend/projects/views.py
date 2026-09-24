from rest_framework import viewsets
from .models import MunicipalProject
from .serializers import MunicipalProjectSerializer

class MunicipalProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MunicipalProject.objects.select_related('ward').all()
    serializer_class = MunicipalProjectSerializer
