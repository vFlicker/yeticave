from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path

from .views.profile import profile
from .views.register import register

app_name = "users"

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(next_page="/"), name="logout"),
    path("profile/<str:username>/", profile, name="profile"),
]
