from django.db import models
from locations.models import Ward

class Category(models.Model):
    name = models.CharField(max_length=100)
    name_ml = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, default='MapPin')
    color = models.CharField(max_length=20, default='#059669')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Facility(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='facilities')
    ward = models.ForeignKey(Ward, on_delete=models.SET_NULL, null=True, blank=True, related_name='facilities')
    name = models.CharField(max_length=250)
    name_ml = models.CharField(max_length=250, blank=True)
    slug = models.SlugField(max_length=250, blank=True)
    description = models.TextField(blank=True)
    description_ml = models.TextField(blank=True)
    address = models.CharField(max_length=350)
    latitude = models.FloatField()
    longitude = models.FloatField()
    phone = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    opening_hours = models.CharField(max_length=150, blank=True)
    verified = models.BooleanField(default=True)
    is_accessible = models.BooleanField(default=True)
    source = models.CharField(max_length=200, default='Anthoor Municipality')
    image_url = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
