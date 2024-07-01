from typing import TYPE_CHECKING, Optional

from ..managers.LotManager import LotQuerySet
from ..models.Lot import Lot

if TYPE_CHECKING:
    from yeticave.users.models import User


class SearchLotService:
    @staticmethod
    def search(lot_title: str, user: Optional["User"]) -> LotQuerySet:
        lots = Lot.objects.select_related("category").get_all_by_title(lot_title)

        if user:
            return lots.with_watchlist_status(user)

        return lots
