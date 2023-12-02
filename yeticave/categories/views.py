from django.shortcuts import render

from yeticave.lots.models import Lot

from .models import Category


def category(request, category_id):
    lots = Lot.objects.filter(category=category_id).with_in_watchlist(request.user)
    category = Category.objects.get(pk=category_id)

    return render(
        request,
        "categories/categories.html",
        {
            "lots": lots,
            "category": category,
        },
    )
