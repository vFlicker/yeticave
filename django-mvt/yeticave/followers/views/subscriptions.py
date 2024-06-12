from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.core.types import AuthenticatedHttpRequest
from yeticave.lots.models.Comment import Comment


@login_required
@require_http_methods(["GET"])
def subscriptions(request: AuthenticatedHttpRequest) -> HttpResponse:
    TEMPLATE = "followers/subscriptions.html"
    COMMENTS_PER_PAGE = 5
    DEFAULT_PAGE = 1

    profile_user = request.user

    comments = Comment.objects.get_subscriptions_comments(profile_user)
    paginator = Paginator(comments, COMMENTS_PER_PAGE)
    page_number = request.GET.get("page", DEFAULT_PAGE)
    page = paginator.get_page(page_number)

    context = {
        "page": page,
    }

    return render(request, TEMPLATE, context)
