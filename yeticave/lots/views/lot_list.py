from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from ..models import Lot

# TODO: Додати сторінку мої ставки/.

# TODO: Якщо користувач увійшов до облікового запису і він є автором аукціону,
# він повинен мати змогу «закрити» аукціон на цій сторінці, що зробить автора
# найбільшої ставки переможцем аукціону, а сам аукціон стане неактивним.

# TODO: Якщо користувач увійшов до облікового запису на сторінці закритого
# аукціону і він є переможцем цього аукціону, він має отримати повідомлення
# про це.


@require_http_methods(["GET"])
def lot_list(request: HttpRequest) -> HttpResponse:
    # TODO: Має дозволити користувачам переглянути всі АКТИВНІ АУКЦІОНИ.

    if request.user.is_authenticated:
        lots = Lot.objects.all().with_in_watchlist(request.user)
    else:
        lots = Lot.objects.all()

    context = {
        "lots": lots,
    }

    return render(request, "lots/index.html", context)
