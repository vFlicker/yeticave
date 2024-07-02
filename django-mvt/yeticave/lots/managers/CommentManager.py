from typing import TYPE_CHECKING

from django.db import models

if TYPE_CHECKING:
    from yeticave.users.models import User


class CommentQuerySet(models.QuerySet):
    def get_all_recent(self):
        return self.all().order_by("-created_at")

    def get_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.filter(lot_id=lot_id)

    def get_latest_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.get_comments_by_id(lot_id).order_by("-created_at")

    def get_subscriptions_comments(self, user: "User") -> "CommentQuerySet":
        following_users_ids = user.following.values_list("following_id", flat=True)
        return self.filter(author__in=following_users_ids).order_by("-created_at")

    def with_user_reactions(self, user: "User") -> "CommentQuerySet":
        return self.annotate(
            has_user_like=models.Count(
                "reactions",
                filter=models.Q(reactions__user=user, reactions__reaction_type="like"),
            ),
            has_user_dislike=models.Count(
                "reactions",
                filter=models.Q(
                    reactions__user=user, reactions__reaction_type="dislike"
                ),
            ),
        )

    def with_counts(self) -> "CommentQuerySet":
        return self.annotate(
            likes_count=models.Count(
                "reactions", filter=models.Q(reactions__reaction_type="like")
            ),
            dislikes_count=models.Count(
                "reactions", filter=models.Q(reactions__reaction_type="dislike")
            ),
        )


class CommentManager(models.Manager):
    def get_queryset(self) -> "CommentQuerySet":
        return CommentQuerySet(self.model, using=self._db)

    def get_all_recent(self) -> "CommentQuerySet":
        return self.get_queryset().get_all_recent()

    def get_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.get_queryset().get_comments_by_id(lot_id)

    def get_latest_comments_by_id(self, lot_id) -> "CommentQuerySet":
        return self.get_queryset().get_latest_comments_by_id(lot_id)

    def get_subscriptions_comments(self, user: "User") -> "CommentQuerySet":
        return self.get_queryset().get_subscriptions_comments(user)

    def with_user_reactions(self, user: "User") -> "CommentQuerySet":
        return self.get_queryset().with_user_reactions(user)

    def with_counts(self) -> "CommentQuerySet":
        return self.get_queryset().with_counts()
