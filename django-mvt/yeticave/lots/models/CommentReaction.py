from django.db import models

from yeticave.core.utils import get_user_model

from ..managers.CommentReactionManager import CommentReactionManager
from .Comment import Comment

User = get_user_model()


class CommentReaction(models.Model):
    REACTION_CHOICES = (
        ("like", "Like"),
        ("dislike", "Dislike"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reactions")
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name="reactions",
    )
    reaction_type = models.CharField(max_length=7, choices=REACTION_CHOICES)

    objects: CommentReactionManager = CommentReactionManager()

    class Meta:
        unique_together = ("user", "comment")

    def __str__(self):
        return f"{self.user} {self.reaction_type} {self.comment}"

    def set_reaction(self, reaction_type: str):
        self.reaction_type = reaction_type
        self.save()
