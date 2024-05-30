from typing import TYPE_CHECKING, cast

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from ..models.Lot import Lot

if TYPE_CHECKING:
    from django.contrib.auth.models import User

# TODO: Додати сторінку мої ставки/.

# TODO: Якщо користувач увійшов до облікового запису і він є автором аукціону,
# він повинен мати змогу «закрити» аукціон на цій сторінці, що зробить автора
# найбільшої ставки переможцем аукціону, а сам аукціон стане неактивним.

# TODO: Якщо користувач увійшов до облікового запису на сторінці закритого
# аукціону і він є переможцем цього аукціону, він має отримати повідомлення
# про це.


@require_http_methods(["GET"])
def lot_list(request: HttpRequest) -> HttpResponse:
    TEMPLATE = "lots/index.html"

    lots = Lot.objects.with_active()

    if request.user.is_authenticated:
        user = cast("User", request.user)
        lots = lots.with_watchlist_status(user)

    context = {
        "lots": lots,
    }

    return render(request, TEMPLATE, context)
