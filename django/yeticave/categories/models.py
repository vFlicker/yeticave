from django.db import models

from .choices import CATEGORIES
from .managers import CategoryManager


class Category(models.Model):
    name = models.CharField(max_length=64, choices=CATEGORIES)

    objects: CategoryManager = CategoryManager()

    def __str__(self):
        return self.name
