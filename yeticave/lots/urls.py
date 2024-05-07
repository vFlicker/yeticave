from django.urls import path

from . import views

app_name = "lots"

urlpatterns = [
    path("", views.index, name="index"),
    path("lot/<int:lot_id>/", views.lotView.as_view(), name="lot"),
    path("create_lot/", views.create_lot, name="create_lot"),
    path("watchlist/", views.watchlist, name="watchlist"),
    path("watchlist/<int:lot_id>/", views.toggle_watchlist, name="toggle_watchlist"),
]
