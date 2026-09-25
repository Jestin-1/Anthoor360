import math
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Category, Facility
from .serializers import CategorySerializer, FacilitySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.select_related('category', 'ward').all()
    serializer_class = FacilitySerializer

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params

        # Filter by multiple categories (comma-separated, e.g. "hospital,school,bank")
        categories = params.get('categories')
        if categories and categories != 'all':
            cat_list = [c.strip() for c in categories.split(',') if c.strip()]
            if cat_list:
                qs = qs.filter(Q(category__slug__in=cat_list) | Q(category__name__in=cat_list))

        # Single category backward compatibility
        category = params.get('category')
        if category and category != 'all':
            qs = qs.filter(Q(category__slug=category) | Q(category__name__iexact=category))

        # Filter by ward
        ward = params.get('ward')
        if ward:
            qs = qs.filter(Q(ward__id=ward) | Q(ward__number=ward))

        # Bounding box filter: minLng,minLat,maxLng,maxLat
        bbox = params.get('bbox')
        if bbox:
            try:
                min_lng, min_lat, max_lng, max_lat = [float(x.strip()) for x in bbox.split(',')]
                qs = qs.filter(
                    latitude__gte=min_lat,
                    latitude__lte=max_lat,
                    longitude__gte=min_lng,
                    longitude__lte=max_lng
                )
            except (ValueError, TypeError):
                pass

        # Filter by verified status
        verified = params.get('verified')
        if verified is not None:
            is_verified = verified.lower() in ['true', '1']
            qs = qs.filter(verified=is_verified)

        # Search term
        search = params.get('search')
        if search:
            qs = qs.filter(
                Q(name__icontains=search) |
                Q(name_ml__icontains=search) |
                Q(description__icontains=search) |
                Q(address__icontains=search)
            )

        return qs

    @action(detail=False, methods=['get'])
    def map_data(self, request):
        """Lightweight endpoint returning only marker essentials for optimal GIS rendering"""
        qs = self.get_queryset()
        data = []
        for f in qs:
            data.append({
                'id': f.id,
                'name': f.name,
                'name_ml': f.name_ml,
                'category': f.category.slug,
                'category_name': f.category.name,
                'category_color': f.category.color,
                'category_icon': f.category.icon,
                'latitude': f.latitude,
                'longitude': f.longitude,
                'coordinates': [f.latitude, f.longitude],
                'verified': f.verified,
                'is_accessible': f.is_accessible,
                'address': f.address,
                'phone': f.phone,
                'ward_id': f.ward.id if f.ward else None,
                'ward_number': f.ward.number if f.ward else None,
                'ward_name': f.ward.name if f.ward else '',
                'ward_name_ml': f.ward.name_ml if f.ward else ''
            })
        return Response(data)

    @action(detail=False, methods=['get'])
    def near_location(self, request):
        """Find facilities around arbitrary GPS coordinates (Near Me query)"""
        try:
            lat = float(request.query_params.get('lat', 11.9865))
            lng = float(request.query_params.get('lng', 75.3780))
            radius_km = float(request.query_params.get('radius', 5.0))
            limit = int(request.query_params.get('limit', 20))
        except (ValueError, TypeError):
            return Response({'error': 'Invalid coordinates or radius'}, status=400)

        qs = self.get_queryset()

        def haversine(f_lat, f_lon):
            R = 6371.0
            dlat = math.radians(f_lat - lat)
            dlon = math.radians(f_lon - lng)
            a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat)) * math.cos(math.radians(f_lat)) * math.sin(dlon / 2)**2
            return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        scored = []
        for f in qs:
            dist = haversine(f.latitude, f.longitude)
            if dist <= radius_km:
                scored.append((dist, f))

        scored.sort(key=lambda x: x[0])
        results = []
        for dist, f in scored[:limit]:
            item = FacilitySerializer(f).data
            item['distance_km'] = round(dist, 2)
            results.append(item)

        return Response(results)

    @action(detail=True, methods=['get'])
    def nearby(self, request, pk=None):
        """Find facilities surrounding a specific facility"""
        facility = self.get_object()
        limit = int(request.query_params.get('limit', 5))
        
        all_facilities = Facility.objects.exclude(id=facility.id)
        
        def calculate_dist(f):
            lat1, lon1 = facility.latitude, facility.longitude
            lat2, lon2 = f.latitude, f.longitude
            R = 6371.0
            dlat = math.radians(lat2 - lat1)
            dlon = math.radians(lon2 - lon1)
            a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
            return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        scored = [(calculate_dist(f), f) for f in all_facilities]
        scored.sort(key=lambda x: x[0])
        
        results = []
        for dist, f in scored[:limit]:
            item = self.get_serializer(f).data
            item['distance_km'] = round(dist, 2)
            results.append(item)
            
        return Response(results)
