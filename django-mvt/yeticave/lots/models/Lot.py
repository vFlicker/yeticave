from django.db import models

from yeticave.categories.models import Category
from yeticave.core.utils import get_user_model

from ..managers.LotManager import LotManager

User = get_user_model()


class Lot(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(
        max_length=1000,
        blank=True,
        null=True,
    )
    image_url = models.URLField()
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    objects: LotManager = LotManager()
    historical = models.Manager()

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.__set_initial_price()
        super().save(*args, **kwargs)

    def deactivate(self):
        self.is_active = False
        self.save(update_fields=["is_active"])

    def __set_initial_price(self):
        if not self.pk:
            self.current_price = self.starting_price
