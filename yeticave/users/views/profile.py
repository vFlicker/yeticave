from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods

from yeticave.users.models import User


@require_http_methods(["GET", "POST"])
def profile(request: HttpRequest, username: str) -> HttpResponse:
    TEMPLATE = "users/profile.html"

    user = get_object_or_404(User, username=username)

    context = {
        "user": user,
    }

    return render(request, TEMPLATE, context)
