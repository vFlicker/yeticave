from django.contrib.auth import get_user_model
from django.db import models

from .Lot import Lot

User = get_user_model()


class Bid(models.Model):
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)

    bid_time = models.DateTimeField(auto_now_add=True)

    lot = models.ForeignKey(Lot, on_delete=models.CASCADE)
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Bid on {self.lot.title} by {self.bidder.get_username()}"
