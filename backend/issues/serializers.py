from rest_framework import serializers
from .models import CivicIssue

class CivicIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CivicIssue
        fields = '__all__'
        read_only_fields = ['tracking_code', 'created_at']
