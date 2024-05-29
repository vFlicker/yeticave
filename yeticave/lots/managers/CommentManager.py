from django.db import models


class CommentQuerySet(models.QuerySet):
    def get_comments(self, lot_id):
        return self.filter(lot_id=lot_id).order_by("-created_at")


class CommentManager(models.Manager):
    def get_queryset(self):
        return CommentQuerySet(self.model, using=self._db)

    def get_comments(self, lot_id):
        return self.get_queryset().get_comments(lot_id)
