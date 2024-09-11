from django.contrib.auth.models import UserManager as DefaultUserManager
from django.db import models


class UserQuerySet(models.QuerySet):
    def find_by_username(self, username: str) -> "UserQuerySet":
        return self.filter(username=username)


class UserManager(DefaultUserManager):
    def get_queryset(self) -> "UserQuerySet":
        return UserQuerySet(self.model, using=self._db)

    def find_by_username(self, username: str) -> "UserQuerySet":
        return self.get_queryset().find_by_username(username)
