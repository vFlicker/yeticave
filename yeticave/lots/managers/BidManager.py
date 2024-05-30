from django.db import models


class BidQuerySet(models.QuerySet):
    def get_all_bids(self, lot_id):
        return self.filter(lot_id=lot_id).order_by("-created_at")


class BidManager(models.Manager):
    def get_queryset(self):
        return BidQuerySet(self.model, using=self._db)

    def get_all_bids(self, lot_id):
        return self.get_queryset().get_all_bids(lot_id)
