from django.urls import path

from . import views

app_name = "auctions"
urlpatterns = [
    path("", views.index, name="index"),
    path("listing/<int:listing_id>/", views.ListingView.as_view(), name="listing"),
    path("create_listing/", views.create_listing, name="create_listing"),
]
