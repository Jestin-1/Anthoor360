import math
from rest_framework import serializers
from .models import Category, Facility

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FacilitySerializer(serializers.ModelSerializer):
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_name_ml = serializers.CharField(source='category.name_ml', read_only=True)
    ward_number = serializers.IntegerField(source='ward.number', read_only=True)
    ward_name = serializers.CharField(source='ward.name', read_only=True)
    coordinates = serializers.SerializerMethodField()
    distance_km = serializers.SerializerMethodField()

    class Meta:
        model = Facility
        fields = '__all__'

    def get_coordinates(self, obj):
        return [obj.latitude, obj.longitude]

    def get_distance_km(self, obj):
        request = self.context.get('request')
        if not request:
            return None
        user_lat = request.query_params.get('lat') or request.query_params.get('userLat')
        user_lng = request.query_params.get('lng') or request.query_params.get('userLng')
        if user_lat and user_lng:
            try:
                lat1, lon1 = float(user_lat), float(user_lng)
                lat2, lon2 = obj.latitude, obj.longitude
                # Haversine formula
                R = 6371.0
                dlat = math.radians(lat2 - lat1)
                dlon = math.radians(lon2 - lon1)
                a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
                c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
                return round(R * c, 2)
            except (ValueError, TypeError):
                return None
        return None
