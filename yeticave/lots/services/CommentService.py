from ..models.Comment import Comment


class CommentService:
    @staticmethod
    def add_comment(text, user, lot):
        Comment.objects.create(text=text, user=user, lot=lot)
