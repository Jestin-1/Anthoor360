from django.contrib import admin
from .models import CivicIssue

@admin.register(CivicIssue)
class CivicIssueAdmin(admin.ModelAdmin):
    list_display = ('tracking_code', 'title', 'issue_type', 'ward', 'status', 'created_at')
    list_filter = ('status', 'issue_type')
    search_fields = ('tracking_code', 'title', 'description', 'reporter_name', 'reporter_phone')
    readonly_fields = ('tracking_code', 'created_at')
