from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from .forms import UserCreationForm
from .services import UserService

User = get_user_model()


@require_http_methods(["GET", "POST"])
def register(request: HttpRequest) -> HttpResponse:
    form = UserCreationForm(request.POST or None)

    if form.is_valid():
        user = UserService.create_user(
            username=form.cleaned_data["username"],
            email=form.cleaned_data["email"],
            password=form.cleaned_data["password"],
        )

        auth_login(request, user)

        return HttpResponseRedirect(reverse("lots:index"))

    return render(request, "registration/register.html", {"form": form})
