from django.contrib import admin
from .models import MunicipalProject

@admin.register(MunicipalProject)
class MunicipalProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'ward', 'status', 'progress', 'budget', 'expected_completion')
    list_filter = ('status', 'ward')
    search_fields = ('name', 'name_ml', 'contractor', 'description')
