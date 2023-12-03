from django.db import models


class Category(models.Model):
    CATEGORIES = [
        ("Boards", "Boards"),
        ("Attachment", "Attachment"),
        ("Boots", "Boots"),
        ("Clothing", "Clothing"),
        ("Tools", "Tools"),
        ("Other", "Other"),
    ]

    name: str = models.CharField(max_length=64, choices=CATEGORIES)

    def __str__(self):
        return self.name
