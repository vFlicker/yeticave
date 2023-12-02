from django.db import models


class Category(models.Model):
    name: str = models.CharField(max_length=64)

    def __str__(self):
        return self.name
