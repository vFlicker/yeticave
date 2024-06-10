from django.db import models

from yeticave.core.utils import get_user_model

from ..constants import BidStatus
from ..managers.BidManager import BidManager
from .Lot import Lot

User = get_user_model()


class Bid(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, related_name="bids")
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")

    objects: BidManager = BidManager()

    def __str__(self):
        return f"Bid on {self.lot.title} by {self.bidder}"

    @property
    def status(self) -> BidStatus:
        if self.lot.is_active:
            return BidStatus.ACTIVE
        elif self.amount == self.lot.current_price:
            return BidStatus.WON
        else:
            return BidStatus.LOST
