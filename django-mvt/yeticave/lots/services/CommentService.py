from typing import TYPE_CHECKING

from ..models.Comment import Comment
from ..models.CommentReaction import CommentReaction

if TYPE_CHECKING:
    from yeticave.users.models import User

    from ..models.Lot import Lot


class CommentService:
    @staticmethod
    def add_comment(author: "User", lot: "Lot", text: str) -> None:
        Comment.objects.create(author=author, lot=lot, text=text)

    @staticmethod
    def toggle_reaction(user: "User", comment_id: int, reaction_type: str) -> None:
        try:
            existing_reaction = user.reactions.get_reaction_by_comment_id(comment_id)
            if existing_reaction.reaction_type == reaction_type:
                existing_reaction.delete()
            else:
                existing_reaction.set_reaction(reaction_type)
        except CommentReaction.DoesNotExist:
            CommentReaction.objects.create(
                user=user,
                comment_id=comment_id,
                reaction_type=reaction_type,
            )
