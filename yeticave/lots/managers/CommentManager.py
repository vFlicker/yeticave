from django.db import models


class CommentQuerySet(models.QuerySet):
    def get_all_comments(self, lot_id):
        return self.filter(lot_id=lot_id).order_by("-created_at")


class CommentManager(models.Manager):
    def get_queryset(self):
        return CommentQuerySet(self.model, using=self._db)

    def get_all_comments(self, lot_id):
        return self.get_queryset().get_all_comments(lot_id)
