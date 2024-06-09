from typing import TYPE_CHECKING, Optional, cast

from django.http import HttpRequest

if TYPE_CHECKING:
    from yeticave.users.models import User


def get_authenticated_user(request: HttpRequest) -> Optional["User"]:
    if request.user.is_authenticated:
        return cast("User", request.user)
    return None
