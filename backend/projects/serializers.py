from rest_framework import serializers
from .models import MunicipalProject

class MunicipalProjectSerializer(serializers.ModelSerializer):
    ward_name = serializers.CharField(source='ward.name', read_only=True)
    coordinates = serializers.SerializerMethodField()

    class Meta:
        model = MunicipalProject
        fields = '__all__'

    def get_coordinates(self, obj):
        if obj.latitude and obj.longitude:
            return [obj.latitude, obj.longitude]
        return None
