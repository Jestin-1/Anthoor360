from django.db import models

class Ward(models.Model):
    number = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=150)
    name_ml = models.CharField(max_length=150, blank=True)
    councillor = models.CharField(max_length=150)
    phone = models.CharField(max_length=50, blank=True)
    population = models.PositiveIntegerField(default=1000)
    latitude = models.FloatField(default=11.9734)
    longitude = models.FloatField(default=75.3852)
    boundary_geojson = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"Ward {self.number}: {self.name}"

    class Meta:
        ordering = ['number']
