from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DirectoryEntryViewSet

router = DefaultRouter()
router.register(r'', DirectoryEntryViewSet, basename='directory')

urlpatterns = [
    path('', include(router.urls)),
]
