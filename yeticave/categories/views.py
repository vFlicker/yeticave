from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.lots.models.Lot import Lot

from .models import Category


@require_http_methods(["GET"])
def category(request: HttpRequest, category_id: int) -> HttpResponse:
    TEMPLATE = "categories/categories.html"

    # TODO: fix this error
    lots = Lot.objects.with_watchlist_status(request.user)
    category = Category.objects.get_category_by_id(category_id)

    context = {
        "lots": lots,
        "category": category,
    }

    return render(request, TEMPLATE, context)
