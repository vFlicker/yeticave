from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path

from . import views

app_name = "accounts"
urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", LoginView.as_view(next_page="/"), name="login"),
    path("logout/", LogoutView.as_view(next_page="/"), name="logout"),
]
