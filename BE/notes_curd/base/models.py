

from django.db import models

# Create your models here.
from django.utils import timezone


class Notes(models.Model):
    title = models.CharField(max_length=1000, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=timezone.now)
    updated_at = models.DateTimeField(auto_now=timezone.now)
