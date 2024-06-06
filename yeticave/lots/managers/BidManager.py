from django.contrib.auth.models import User
from django.db import models


class BidQuerySet(models.QuerySet):
    def get_bids_by_lot_id(self, lot_id: int) -> "BidQuerySet":
        return self.filter(lot_id=lot_id)

    def get_latest_bids_by_id(self, lot_id: int) -> "BidQuerySet":
        return self.get_bids_by_lot_id(lot_id).order_by("-created_at")

    def get_user_bids(self, bidder: User) -> "BidQuerySet":
        return self.filter(bidder=bidder).order_by("-created_at")


class BidManager(models.Manager):
    def get_queryset(self):
        return BidQuerySet(self.model, using=self._db)

    def get_bids_by_lot_id(self, lot_id: int) -> "BidQuerySet":
        return self.get_queryset().get_bids_by_lot_id(lot_id)

    def get_latest_bids_by_id(self, lot_id: int) -> "BidQuerySet":
        return self.get_queryset().get_latest_bids_by_id(lot_id)

    def get_user_bids(self, bidder: User) -> "BidQuerySet":
        return self.get_queryset().get_user_bids(bidder)
