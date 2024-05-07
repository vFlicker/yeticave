from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from ..models import Lot


@require_http_methods(["GET"])
@login_required
def watchlist(request):
    lots = Lot.objects.with_in_watchlist(request.user).filter(in_watchlist=True)

    context = {
        "lots": lots,
    }

    return render(request, "watchlist/watchlist.html", context)
