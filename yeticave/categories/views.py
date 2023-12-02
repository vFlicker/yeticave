from django.shortcuts import render
from yeticave.auctions.models import Listing

from .models import Category


def category(request, category_id):
    listings = Listing.objects.filter(category=category_id).with_in_watchlist(
        request.user
    )
    category = Category.objects.get(pk=category_id)

    return render(
        request,
        "categories/categories.html",
        {
            "listings": listings,
            "category": category,
        },
    )
