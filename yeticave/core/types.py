from typing import TYPE_CHECKING

from django.http import HttpRequest

if TYPE_CHECKING:
    from yeticave.accounts.models import User


class AuthenticatedHttpRequest(HttpRequest):
    user: "User"
