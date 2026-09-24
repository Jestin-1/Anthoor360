from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/wards/', include('locations.urls')),
    path('api/v1/facilities/', include('facilities.urls')),
    path('api/v1/projects/', include('projects.urls')),
    path('api/v1/', include('content.urls')),
    path('api/v1/directory/', include('directory.urls')),
    path('api/v1/issues/', include('issues.urls')),
]
