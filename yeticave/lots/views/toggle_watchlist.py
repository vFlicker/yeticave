from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods

from ..models import Lot, Watchlist


@require_http_methods(["POST"])
@login_required
def toggle_watchlist(request, lot_id):
    lot = get_object_or_404(Lot, pk=lot_id)

    watchlist_item, created = Watchlist.objects.get_or_create(
        owner=request.user,
        item=lot,
    )

    if not created:
        watchlist_item.delete()

    return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
