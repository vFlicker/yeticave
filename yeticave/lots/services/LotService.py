from django.contrib.auth.models import User

from ..models.Lot import Lot


class LotService:
    @staticmethod
    def create_lot(
        creator: User,
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
    def check_creator(lot: Lot, user: User) -> bool:
        return lot.creator.pk == user.pk
