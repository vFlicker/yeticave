from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.core.types import AuthenticatedHttpRequest

from ..models.Lot import Lot


@require_http_methods(["GET"])
@login_required
def watchlist(request: AuthenticatedHttpRequest):
    TEMPLATE = "lots/watchlist.html"

    lots = Lot.objects.get_user_watchlist(request.user)

    context = {
        "lots": lots,
    }

    return render(request, TEMPLATE, context)
