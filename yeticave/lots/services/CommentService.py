from typing import TYPE_CHECKING

from ..models.Comment import Comment

if TYPE_CHECKING:
    from django.contrib.auth.models import User

    from ..models.Lot import Lot


class CommentService:
    @staticmethod
    def add_comment(author: "User", lot: "Lot", text: str):
        Comment.objects.create(author=author, lot=lot, text=text)
