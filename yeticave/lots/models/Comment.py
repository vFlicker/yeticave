from django.db import models

from yeticave.users.models import User

from ..managers.CommentManager import CommentManager
from .Lot import Lot


class Comment(models.Model):
    text = models.TextField("Comment")
    created_at = models.DateTimeField(auto_now_add=True)

    lot = models.ForeignKey(Lot, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    objects: CommentManager = CommentManager()

    def __str__(self):
        return f"Comment on {self.lot.title} by {self.author.get_username()}"
