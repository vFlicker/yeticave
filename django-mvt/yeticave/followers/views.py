from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import require_http_methods

from yeticave.core.types import AuthenticatedHttpRequest
from yeticave.core.utils import get_user_model

from .services import FollowService

User = get_user_model()


@login_required
@require_http_methods(["POST"])
def toggle_follow(request: AuthenticatedHttpRequest, username: str) -> HttpResponse:
    current_user = request.user
    user_to_follow = get_object_or_404(User, username=username)

    if current_user != user_to_follow:
        FollowService.toggle_follow(current_user, user_to_follow)

    return redirect(request.META.get("HTTP_REFERER", "/"))
