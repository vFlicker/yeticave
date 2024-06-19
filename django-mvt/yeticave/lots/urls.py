from django.urls import path

from .views.create_lot import create_lot
from .views.lot_details import lot_details
from .views.lot_list import lot_list
from .views.my_bids import my_bids
from .views.search import search
from .views.toggle_watchlist import toggle_watchlist
from .views.watchlist import watchlist

app_name = "lots"

urlpatterns = [
    path("", lot_list, name="lot_list"),
    path("search/", search, name="search"),
    path("my_bets/", my_bids, name="my_bids"),
    path("lots/<int:lot_id>/", lot_details, name="lot_details"),
    path("create_lot/", create_lot, name="create_lot"),
    path("watchlist/", watchlist, name="watchlist"),
    path("watchlist/<int:lot_id>/", toggle_watchlist, name="toggle_watchlist"),
]
