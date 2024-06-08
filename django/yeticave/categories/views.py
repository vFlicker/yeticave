from typing import TYPE_CHECKING, cast

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.lots.models.Lot import Lot

from .models import Category

if TYPE_CHECKING:
    from yeticave.users.models import User


@require_http_methods(["GET"])
def category(request: HttpRequest, category_id: int) -> HttpResponse:
    TEMPLATE = "categories/categories.html"

    category = Category.objects.get_category_by_id(category_id)

    lots = Lot.objects.get_all_by_category(category_id)

    if request.user.is_authenticated:
        user = cast("User", request.user)
        lots = lots.with_watchlist_status(user)

    context = {
        "category": category,
        "lots": lots,
    }

    return render(request, TEMPLATE, context)
