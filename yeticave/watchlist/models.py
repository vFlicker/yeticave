from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from yeticave.lots.models import Lot

User = get_user_model()


class Watchlist(models.Model):
    owner: User = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="watchlist"
    )
    item: Lot = models.ForeignKey(Lot, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("owner", "item")

    def __str__(self):
        return f"Watchlist for user {self.owner.username} with item {self.item.title}"
