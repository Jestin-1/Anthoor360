from rest_framework import viewsets
from .models import Ward
from .serializers import WardSerializer

class WardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
