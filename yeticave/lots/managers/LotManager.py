from django.contrib.auth.models import User
from django.db import models
from django.db.models import BooleanField, Case, Value, When


class LotQuerySet(models.QuerySet):
    def get_user_watchlist(self, user: User) -> "LotQuerySet":
        return self.filter(watchlist__owner=user)

    def get_all_by_category(self, category_id: int) -> "LotQuerySet":
        return self.filter(category_id=category_id)

    def with_watchlist_status(self, user: User) -> "LotQuerySet":
        return self.annotate(
            in_watchlist=Case(
                When(watchlist__owner=user, then=Value(True)),
                default=Value(False),
                output_field=BooleanField(),
            )
        )


class LotManager(models.Manager):
    def get_queryset(self) -> "LotQuerySet":
        return LotQuerySet(self.model, using=self._db).filter(is_active=True)

    def get_user_watchlist(self, user: User) -> "LotQuerySet":
        return self.get_queryset().get_user_watchlist(user).with_watchlist_status(user)

    def get_all_by_category(self, category_id: int) -> "LotQuerySet":
        return self.get_queryset().get_all_by_category(category_id)

    def with_watchlist_status(self, user: User) -> "LotQuerySet":
        return self.get_queryset().with_watchlist_status(user)
