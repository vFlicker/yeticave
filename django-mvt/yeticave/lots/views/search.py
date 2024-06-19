from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.core.utils import get_authenticated_user

from ..services.SearchLotService import SearchLotService


@require_http_methods(["GET"])
def search(request: HttpRequest) -> HttpResponse:
    TEMPLATE = "lots/search.html"

    lot_title = request.GET.get("q", "")
    user = get_authenticated_user(request)

    context = {
        "lots": SearchLotService.search(lot_title, user),
    }

    return render(request, TEMPLATE, context)
