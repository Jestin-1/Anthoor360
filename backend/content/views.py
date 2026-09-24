from rest_framework import viewsets
from .models import CitizenService, Announcement
from .serializers import CitizenServiceSerializer, AnnouncementSerializer

class CitizenServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CitizenService.objects.all()
    serializer_class = CitizenServiceSerializer

class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
