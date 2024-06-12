from django.core.paginator import Paginator
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods

from yeticave.core.utils import get_authenticated_user, get_user_model
from yeticave.followers.models import Follow

User = get_user_model()


@require_http_methods(["GET"])
def profile(request: HttpRequest, username: str) -> HttpResponse:
    TEMPLATE = "users/profile.html"
    COMMENTS_PER_PAGE = 5
    DEFAULT_PAGE = 1

    profile_user = get_object_or_404(User, username=username)
    is_followed = False

    if auth_user := get_authenticated_user(request):
        is_followed = Follow.objects.is_followed(auth_user, profile_user)

    comments = profile_user.comments.get_all_recent()
    paginator = Paginator(comments, COMMENTS_PER_PAGE)
    page_number = request.GET.get("page", DEFAULT_PAGE)
    page = paginator.get_page(page_number)

    context = {
        "page": page,
        "profile_user": profile_user,
        "is_followed": is_followed,
    }

    return render(request, TEMPLATE, context)
