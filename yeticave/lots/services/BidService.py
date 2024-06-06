from decimal import Decimal
from typing import TYPE_CHECKING

from ..errors import BidAmountError
from ..models.Bid import Bid

if TYPE_CHECKING:
    from yeticave.accounts.models import User

    from ..models.Lot import Lot


class BidService:
    @staticmethod
    def place_bid(bidder: "User", lot: "Lot", amount: int) -> None:
        if lot.current_price >= amount:
            raise BidAmountError("Your bid must be higher than the current price.")

        bid = Bid.objects.create(bidder=bidder, lot=lot, amount=amount)
        bid.lot.current_price = Decimal(amount)
        bid.lot.save()
