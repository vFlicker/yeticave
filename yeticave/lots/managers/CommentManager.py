from django.db import models


class CommentQuerySet(models.QuerySet):
    def get_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.filter(lot_id=lot_id)

    def get_latest_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.get_comments_by_id(lot_id).order_by("-created_at")


class CommentManager(models.Manager):
    def get_queryset(self) -> "CommentQuerySet":
        return CommentQuerySet(self.model, using=self._db)

    def get_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.get_queryset().get_comments_by_id(lot_id)

    def get_latest_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.get_queryset().get_latest_comments_by_id(lot_id)
