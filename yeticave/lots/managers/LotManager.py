from django.contrib.auth.models import User
from django.db import models
from django.db.models import BooleanField, Case, Value, When


class LotQuerySet(models.QuerySet):
    def get_user_watchlist(self, user: User) -> "LotQuerySet":
        return self.filter(watchlist__owner=user)

    def with_watchlist_status(self, user: User) -> "LotQuerySet":
        return self.annotate(
            in_watchlist=Case(
                When(watchlist__owner=user, then=Value(True)),
                default=Value(False),
                output_field=BooleanField(),
            )
        )

    def with_active(self) -> "LotQuerySet":
        return self.filter(is_active=True)


class LotManager(models.Manager):
    def get_queryset(self) -> "LotQuerySet":
        return LotQuerySet(self.model, using=self._db)

    def get_user_watchlist(self, user: User) -> "LotQuerySet":
        return self.get_queryset().get_user_watchlist(user).with_watchlist_status(user)

    def with_watchlist_status(self, user: User) -> "LotQuerySet":
        return self.get_queryset().with_watchlist_status(user)

    def with_active(self) -> "LotQuerySet":
        return self.get_queryset().with_active()
