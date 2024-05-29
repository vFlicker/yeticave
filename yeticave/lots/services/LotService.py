from django.contrib.auth.models import User

from ..models.Lot import Lot


class LotService:
    @staticmethod
    def create_lot(
        title: str,
        description: str,
        starting_bid: int,
        image_url: str,
        category: str,
        creator: User,
    ) -> Lot:
        lot = Lot.objects.create(
            title=title,
            description=description,
            starting_bid=starting_bid,
            image_url=image_url,
            category=category,
            creator=creator,
        )
        return lot

    @staticmethod
    def check_creator(lot: Lot, user: User) -> bool:
        return lot.creator == user
