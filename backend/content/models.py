from django.db import models

class CitizenService(models.Model):
    title = models.CharField(max_length=200)
    title_ml = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=100)
    category_ml = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=200)
    description = models.TextField()
    description_ml = models.TextField(blank=True)
    required_documents = models.JSONField(default=list)
    procedure = models.TextField(blank=True)
    fee = models.CharField(max_length=150, default='Free')
    processing_time = models.CharField(max_length=100)
    official_portal_url = models.URLField()

    def __str__(self):
        return self.title

class Announcement(models.Model):
    title = models.CharField(max_length=250)
    title_ml = models.CharField(max_length=250, blank=True)
    category = models.CharField(max_length=100, default='General')
    content = models.TextField()
    published_date = models.DateField(auto_now_add=True)
    urgent = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_date', '-id']
