from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.core.utils import get_authenticated_user

from ..models.Lot import Lot


@require_http_methods(["GET"])
def lot_list(request: HttpRequest) -> HttpResponse:
    TEMPLATE = "lots/lot_list.html"

    lots = Lot.objects.select_related("category")

    if auth_user := get_authenticated_user(request):
        lots = lots.with_watchlist_status(auth_user)

    context = {
        "lots": lots,
    }

    return render(request, TEMPLATE, context)
