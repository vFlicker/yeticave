from django.db import models

from yeticave.users.models import User

from ..constants import BidStatus
from ..managers.BidManager import BidManager
from .Lot import Lot


class Bid(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, related_name="bids")
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)

    objects: BidManager = BidManager()

    def __str__(self):
        return f"Bid on {self.lot.title} by {self.bidder}"

    @property
    def status(self):
        if self.lot.is_active:
            return BidStatus.ACTIVE
        elif self.amount == self.lot.current_price:
            return BidStatus.WON
        else:
            return BidStatus.LOST
