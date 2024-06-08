from typing import TYPE_CHECKING, cast

from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods

from yeticave.core.utils.get_user_model import get_user_model
from yeticave.followers.models import Follow

User = get_user_model()

if TYPE_CHECKING:
    from yeticave.users.models import User as UserType


@require_http_methods(["GET"])
def profile(request: HttpRequest, username: str) -> HttpResponse:
    TEMPLATE = "users/profile.html"

    profile_user = get_object_or_404(User, username=username)
    is_followed = False

    if request.user.is_authenticated:
        current_user = cast("UserType", request.user)
        is_followed = Follow.objects.is_followed(current_user, profile_user)

    context = {
        "profile_user": profile_user,
        "is_followed": is_followed,
    }

    return render(request, TEMPLATE, context)
