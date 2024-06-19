from django.db import models

from yeticave.core.utils import get_user_model

from ..managers.CommentManager import CommentManager
from .Lot import Lot

User = get_user_model()


class Comment(models.Model):
    text = models.TextField("Comment")
    created_at = models.DateTimeField(auto_now_add=True)

    lot = models.ForeignKey(Lot, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")

    objects: CommentManager = CommentManager()

    def __str__(self):
        return f"Comment on {self.lot.title} by {self.author.get_username()}"