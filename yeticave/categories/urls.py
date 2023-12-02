from django.urls import path

from . import views

app_name = "categories"
urlpatterns = [
    path("<int:category_id>/", views.category, name="category"),
]
