from django.db import models
from locations.models import Ward

class MunicipalProject(models.Model):
    STATUS_CHOICES = [
        ('Proposed', 'Proposed'),
        ('Approved', 'Approved'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('On hold', 'On hold'),
    ]

    ward = models.ForeignKey(Ward, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    name = models.CharField(max_length=250)
    name_ml = models.CharField(max_length=250, blank=True)
    budget = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Ongoing')
    progress = models.PositiveIntegerField(default=0)
    start_date = models.CharField(max_length=50, blank=True)
    expected_completion = models.CharField(max_length=50, blank=True)
    contractor = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
