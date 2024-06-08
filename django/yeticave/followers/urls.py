from django.urls import path

from .views import toggle_follow

app_name = "followers"

urlpatterns = [
    path("toggle-follow/<str:username>/", toggle_follow, name="toggle_follow"),
]
