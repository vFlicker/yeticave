from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import UserManager

if TYPE_CHECKING:
    from yeticave.followers.managers import FollowManager
    from yeticave.lots.managers.CommentManager import CommentManager


class User(AbstractUser):
    first_name = None
    last_name = None

    email = models.EmailField("Email Address", unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects: UserManager = UserManager()

    comments: "CommentManager"
    following: "FollowManager"
    followers: "FollowManager"

    def __str__(self):
        return self.email
