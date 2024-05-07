from django.db import models

from .choices import CATEGORIES


class Category(models.Model):
    name = models.CharField(max_length=64, choices=CATEGORIES)

    def __str__(self):
        return self.name
