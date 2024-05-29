from django.contrib.auth import get_user_model
from django.db import models

from ..managers.CommentManager import CommentManager
from .Lot import Lot

User = get_user_model()


class Comment(models.Model):
    text = models.TextField("Comment")
    created_at = models.DateTimeField(auto_now_add=True)

    lot = models.ForeignKey(Lot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    objects: CommentManager = CommentManager()

    def __str__(self):
        return f"Comment on {self.lot.title} by {self.user.get_username()}"
