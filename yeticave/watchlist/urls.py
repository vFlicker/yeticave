from django.urls import path

from . import views

app_name = "watchlist"
urlpatterns = [
    path("", views.watchlist, name="index"),
    path("<int:listing_id>/", views.toggle_watchlist, name="toggle_watchlist"),
]
