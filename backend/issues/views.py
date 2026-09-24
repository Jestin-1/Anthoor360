from rest_framework import viewsets
from .models import CivicIssue
from .serializers import CivicIssueSerializer

class CivicIssueViewSet(viewsets.ModelViewSet):
    queryset = CivicIssue.objects.all()
    serializer_class = CivicIssueSerializer
