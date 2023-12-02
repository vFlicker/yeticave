from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods

from yeticave.lots.models import Lot

from .models import Watchlist


@require_http_methods(["GET"])
@login_required
def watchlist(request):
    lots = Lot.objects.with_in_watchlist(request.user).filter(in_watchlist=True)

    return render(
        request,
        "watchlist/watchlist.html",
        {
            "lots": lots,
        },
    )


@require_http_methods(["POST"])
@login_required
def toggle_watchlist(request, lot_id):
    lot = get_object_or_404(Lot, pk=lot_id)
    watchlist_item, created = Watchlist.objects.get_or_create(
        owner=request.user, item=lot
    )

    if not created:
        watchlist_item.delete()

    return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
