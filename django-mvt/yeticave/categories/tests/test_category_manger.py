import pytest

from ..models import Category


@pytest.mark.django_db
class TestFindCategoryById:
    @pytest.fixture
    def category(self, db):
        return Category.objects.create(name="category")

    def test_when_category_exists_returns_category(self, category):
        result = Category.objects.find_category_by_id(category.id)
        assert result == category

    def test_when_category_does_not_exist_raises_exception(self):
        with pytest.raises(Category.DoesNotExist):
            Category.objects.find_category_by_id(1)
