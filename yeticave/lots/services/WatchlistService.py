from typing import TYPE_CHECKING

from ..models.Watchlist import Watchlist

if TYPE_CHECKING:
    from yeticave.accounts.models import User

    from ..models.Lot import Lot


class WatchlistService:
    @staticmethod
    def toggle_watchlist(user: "User", lot: "Lot") -> bool:
        watchlist_item, created = Watchlist.objects.get_or_create(
            owner=user,
            lot=lot,
        )

        if not created:
            watchlist_item.delete()
            return False

        return True
