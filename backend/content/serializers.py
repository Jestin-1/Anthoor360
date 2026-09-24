from rest_framework import serializers
from .models import CitizenService, Announcement

class CitizenServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitizenService
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
