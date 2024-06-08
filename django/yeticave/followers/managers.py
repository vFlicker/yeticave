from typing import TYPE_CHECKING

from django.db import models

if TYPE_CHECKING:
    from yeticave.users.models import User


class FollowQuerySet(models.QuerySet):
    def get_total_count(self) -> int:
        return self.all().count()

    def is_following(self, follower: "User", following: "User") -> bool:
        return self.filter(follower=follower, following=following).exists()


class FollowManager(models.Manager):
    def get_queryset(self) -> FollowQuerySet:
        return FollowQuerySet(self.model, using=self._db)

    def get_total_count(self) -> int:
        return self.get_queryset().get_total_count()

    def is_followed(self, follower: "User", following: "User") -> bool:
        return self.get_queryset().is_following(follower, following)
