from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods

from yeticave.core.services.MessageService import MessageService, MessageTemplates
from yeticave.core.types import AuthenticatedHttpRequest

from ..models.Lot import Lot
from ..services.WatchlistService import WatchlistService


@require_http_methods(["POST"])
@login_required
def toggle_watchlist(request: AuthenticatedHttpRequest, lot_id: int):
    lot = get_object_or_404(Lot, id=lot_id)
    is_added = WatchlistService.toggle_watchlist(request.user, lot)

    if is_added:
        name = lot.category.name
        title = lot.title
        message_test = MessageTemplates.added_to_watchlist(name, title)
        MessageService.add_message(request, message_test)

    return HttpResponseRedirect(request.META.get("HTTP_REFERER", "/"))
