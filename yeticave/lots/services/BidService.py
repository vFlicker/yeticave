from decimal import Decimal

from django.contrib.auth.models import User

from ..errors import BidAmountError
from ..models.Bid import Bid
from ..models.Lot import Lot


class BidService:
    @staticmethod
    def place_bid(bidder: User, lot: Lot, bid_amount: int) -> None:
        if lot.current_price >= bid_amount:
            raise BidAmountError("Your bid must be higher than the current price.")

        bid = Bid.objects.create(bidder=bidder, lot=lot, bid_amount=bid_amount)
        bid.lot.current_price = Decimal(bid_amount)
        bid.lot.save()
