from django.contrib import admin
from .models import CitizenService, Announcement

@admin.register(CitizenService)
class CitizenServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'category', 'fee', 'processing_time')
    list_filter = ('category', 'department')
    search_fields = ('title', 'title_ml', 'department', 'description')

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_date', 'urgent')
    list_filter = ('urgent', 'category')
    search_fields = ('title', 'title_ml', 'content')
