from django.contrib import admin
from .models import Category, Facility

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_ml', 'slug', 'color', 'icon')
    search_fields = ('name', 'name_ml', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'ward', 'verified', 'phone', 'latitude', 'longitude')
    list_filter = ('category', 'verified', 'ward')
    search_fields = ('name', 'name_ml', 'address', 'description')
    ordering = ('name',)
