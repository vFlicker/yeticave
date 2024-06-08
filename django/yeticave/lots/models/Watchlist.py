from django.db import models

from yeticave.users.models import User

from .Lot import Lot


class Watchlist(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="watchlist",
    )
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("owner", "lot")

    def __str__(self):
        return (
            f"Watchlist for user {self.owner.get_username()} with item {self.lot.title}"
        )
