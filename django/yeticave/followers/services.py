from typing import TYPE_CHECKING

from .models import Follow

if TYPE_CHECKING:
    from yeticave.users.models import User


class FollowService:
    @staticmethod
    def toggle_follow(follower: "User", following: "User") -> bool:
        follow, is_created = Follow.objects.get_or_create(
            follower=follower,
            following=following,
        )

        if not is_created:
            follow.delete()
            return False

        return True
