from django.contrib import admin
from .models import DirectoryEntry

@admin.register(DirectoryEntry)
class DirectoryEntryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'ward', 'phone', 'verified', 'rating')
    list_filter = ('verified', 'category')
    search_fields = ('name', 'address', 'ward', 'phone')
