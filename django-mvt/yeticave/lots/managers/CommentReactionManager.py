from typing import TYPE_CHECKING

from django.db import models

if TYPE_CHECKING:
    from ..models.CommentReaction import CommentReaction


class CommentReactionQuerySet(models.QuerySet):
    def get_reaction_by_comment_id(self, comment_id: int) -> "CommentReaction":
        return self.get(comment_id=comment_id)


class CommentReactionManager(models.Manager):
    def get_queryset(self) -> "CommentReactionQuerySet":
        return CommentReactionQuerySet(self.model, using=self._db)

    def get_reaction_by_comment_id(self, comment_id: int) -> "CommentReaction":
        return self.get_queryset().get_reaction_by_comment_id(comment_id)
