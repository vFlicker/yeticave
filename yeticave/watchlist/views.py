from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from yeticave.auctions.models import Listing

from .models import Watchlist


@require_http_methods(["GET"])
@login_required
def watchlist(request):
    listings = Listing.objects.with_in_watchlist(request.user).filter(in_watchlist=True)

    return render(
        request,
        "watchlist/watchlist.html",
        {
            "listings": listings,
        },
    )


@require_http_methods(["POST"])
@login_required
def toggle_watchlist(request, listing_id):
    listing = get_object_or_404(Listing, pk=listing_id)
    watchlist_item, created = Watchlist.objects.get_or_create(
        owner=request.user, item=listing
    )

    if not created:
        watchlist_item.delete()

    return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
