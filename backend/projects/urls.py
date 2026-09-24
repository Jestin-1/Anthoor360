from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MunicipalProjectViewSet

router = DefaultRouter()
router.register(r'', MunicipalProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
]
