from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.core.types import AuthenticatedHttpRequest
from yeticave.lots.models.Comment import Comment


@login_required
@require_http_methods(["GET"])
def subscriptions(request: AuthenticatedHttpRequest) -> HttpResponse:
    TEMPLATE = "followers/subscriptions.html"

    profile_user = request.user

    context = {
        "comments": Comment.objects.get_subscriptions_comments(profile_user),
    }

    return render(request, TEMPLATE, context)
