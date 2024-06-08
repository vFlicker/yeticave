from typing import TYPE_CHECKING, Type, cast

from django.contrib.auth import get_user_model as django_get_user_model

if TYPE_CHECKING:
    from yeticave.users.models import User


def get_user_model() -> Type["User"]:
    return cast(Type["User"], django_get_user_model())
