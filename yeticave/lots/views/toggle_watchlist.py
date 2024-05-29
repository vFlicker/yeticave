from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods

from yeticave.core.services.MessageService import MessageService
from yeticave.core.types import AuthenticatedHttpRequest

from ..models.Lot import Lot
from ..services.WatchlistService import WatchlistService


@require_http_methods(["POST"])
@login_required
def toggle_watchlist(request: AuthenticatedHttpRequest, lot_id: int):
    lot = get_object_or_404(Lot, id=lot_id)
    added = WatchlistService.toggle_watchlist(request.user, lot)

    if added:
        message_test = f"{lot.category.name} {lot.title} added to watchlist."
        MessageService.add_message(request, message_test)

    return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))
