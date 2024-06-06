from typing import TYPE_CHECKING, cast

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from ..models.Lot import Lot

if TYPE_CHECKING:
    from yeticave.accounts.models import User


@require_http_methods(["GET"])
def lot_list(request: HttpRequest) -> HttpResponse:
    TEMPLATE = "lots/index.html"

    lots = Lot.objects.all()

    if request.user.is_authenticated:
        user = cast("User", request.user)
        lots = lots.with_watchlist_status(user)

    context = {
        "lots": lots,
    }

    return render(request, TEMPLATE, context)
