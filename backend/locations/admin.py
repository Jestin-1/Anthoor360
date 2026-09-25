from django.contrib import admin
from .models import Ward

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ('number', 'name', 'name_ml', 'councillor', 'phone', 'population')
    search_fields = ('name', 'name_ml', 'councillor', 'number')
    ordering = ('number',)
