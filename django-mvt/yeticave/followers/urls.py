from django.urls import path

from .views.subscriptions import subscriptions
from .views.toggle_follow import toggle_follow

app_name = "followers"

urlpatterns = [
    path("toggle-follow/<str:username>/", toggle_follow, name="toggle_follow"),
    path("subscriptions/", subscriptions, name="subscriptions"),
]
