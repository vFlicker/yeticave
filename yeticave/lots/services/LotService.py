from typing import TYPE_CHECKING

from yeticave.core.services.NotificationService import NotificationService

from ..models.Bid import Bid
from ..models.Lot import Lot

if TYPE_CHECKING:
    from yeticave.accounts.models import User


class LotService:
    @staticmethod
    def create_lot(
        creator: "User",
        title: str,
        description: str,
        starting_price: int,
        image_url: str,
        category: str,
        finished_at: str,
    ) -> Lot:
        lot = Lot.objects.create(
            title=title,
            description=description,
            starting_price=starting_price,
            image_url=image_url,
            category=category,
            creator=creator,
            finished_at=finished_at,
        )
        return lot

    @staticmethod
    def check_creator(lot: Lot, user: "User") -> bool:
        return lot.creator.pk == user.pk

    @staticmethod
    def complete_auction(lot: Lot) -> None:
        lot.deactivate()

        winning_bid = Bid.objects.find_winning_bid(lot.pk)
        if winning_bid:
            print(f"Send email {winning_bid.bidder.email}")
            NotificationService.send_email()
