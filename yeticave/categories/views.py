from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from yeticave.lots.models import Lot

from .models import Category


def category(request: HttpRequest, category_id: int) -> HttpResponse:
    lots = Lot.objects.filter(category=category_id).with_in_watchlist(request.user)
    category = Category.objects.get(pk=category_id)

    context = {
        "lots": lots,
        "category": category,
    }

    return render(request, "categories/categories.html", context)
