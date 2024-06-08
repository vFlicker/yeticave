from .models import User


class UserService:
    @staticmethod
    def create_user(username: str, email: str, password: str) -> User:
        user = User.objects.create(username=username, email=email)
        user.set_password(password)
        user.save()

        return user
