from django.contrib.auth import get_user_model
from django.db import models

from .Lot import Lot

User = get_user_model()


class Watchlist(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="watchlist",
    )
    item = models.ForeignKey(Lot, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("owner", "item")

    def __str__(self):
        return f"Watchlist for user {self.owner.get_username()} with item {self.item.title}"
