from typing import TYPE_CHECKING

from django.db import models

if TYPE_CHECKING:
    from .models import Category


class CategoryQuerySet(models.QuerySet):
    def find_category_by_id(self, category_id: int) -> "Category":
        return self.get(id=category_id)


class CategoryManager(models.Manager):
    def get_queryset(self) -> CategoryQuerySet:
        return CategoryQuerySet(self.model, using=self._db)

    def find_category_by_id(self, category_id: int) -> "Category":
        return self.get_queryset().find_category_by_id(category_id)
