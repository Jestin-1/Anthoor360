from rest_framework import serializers
from .models import DirectoryEntry

class DirectoryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectoryEntry
        fields = '__all__'
