from django.db import models

class DirectoryEntry(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    ward = models.CharField(max_length=150)
    address = models.CharField(max_length=350)
    phone = models.CharField(max_length=50)
    verified = models.BooleanField(default=False)
    rating = models.FloatField(default=4.5)
    hours = models.CharField(max_length=100, default='8:00 AM - 8:00 PM')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
        verbose_name_plural = "Directory Entries"
