from typing import TYPE_CHECKING

from yeticave.lots.models.Watchlist import Watchlist

if TYPE_CHECKING:
    from django.contrib.auth.models import User

    from yeticave.lots.models.Lot import Lot


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
