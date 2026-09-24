from rest_framework import viewsets
from .models import DirectoryEntry
from .serializers import DirectoryEntrySerializer

class DirectoryEntryViewSet(viewsets.ModelViewSet):
    queryset = DirectoryEntry.objects.all()
    serializer_class = DirectoryEntrySerializer

    def perform_create(self, serializer):
        # Public registrations are marked unverified until municipal review
        serializer.save(verified=False)
