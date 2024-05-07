from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import BooleanField, Case, Value, When

from yeticave.categories.choices import DEFAULT_CATEGORY
from yeticave.categories.models import Category

User = get_user_model()


class LotQuerySet(models.QuerySet):
    def with_in_watchlist(self, user) -> models.QuerySet:
        return self.annotate(
            in_watchlist=Case(
                When(watchlist__owner=user, then=Value(True)),
                default=Value(False),
                output_field=BooleanField(),
            )
        )


LotManager = models.Manager.from_queryset(LotQuerySet)


class Lot(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField()
    starting_bid = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        default=DEFAULT_CATEGORY,
    )
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = LotManager()

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            self.current_price = self.starting_bid

        super().save(*args, **kwargs)
