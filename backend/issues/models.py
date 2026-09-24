import random
from django.db import models

class CivicIssue(models.Model):
    STATUS_CHOICES = [
        ('Submitted', 'Submitted'),
        ('Under Review', 'Under Review'),
        ('Assigned', 'Assigned'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
    ]

    issue_type = models.CharField(max_length=150)
    ward = models.CharField(max_length=100)
    title = models.CharField(max_length=250)
    description = models.TextField()
    address = models.CharField(max_length=350)
    reporter_name = models.CharField(max_length=150, blank=True)
    reporter_phone = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Submitted')
    tracking_code = models.CharField(max_length=50, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            self.tracking_code = f"ANT-2026-{random.randint(100000, 999999)}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_code} - {self.title}"

    class Meta:
        ordering = ['-created_at']
