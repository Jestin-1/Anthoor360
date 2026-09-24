from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CitizenServiceViewSet, AnnouncementViewSet

router = DefaultRouter()
router.register(r'services', CitizenServiceViewSet, basename='service')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')

urlpatterns = [
    path('', include(router.urls)),
]
