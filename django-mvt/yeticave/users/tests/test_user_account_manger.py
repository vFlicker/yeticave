import pytest

from yeticave.core.utils import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestFindByUsername:
    @pytest.fixture
    def user(self, db):
        return User.objects.create(username="username")

    def test_when_username_exists_returns_user_account(self, user):
        result = User.objects.find_by_username(user.username)
        assert result.first() == user

    def test_when_username_does_not_exist_returns_none(self):
        result = User.objects.find_by_username("username")
        assert result.first() is None
