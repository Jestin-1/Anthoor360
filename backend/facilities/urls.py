from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, FacilityViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'', FacilityViewSet, basename='facility')

urlpatterns = [
    path('map-data/', FacilityViewSet.as_view({'get': 'map_data'}), name='facility-map-data'),
    path('map_data/', FacilityViewSet.as_view({'get': 'map_data'}), name='facility-map-data-alt'),
    path('near-location/', FacilityViewSet.as_view({'get': 'near_location'}), name='facility-near-location'),
    path('', include(router.urls)),
]
