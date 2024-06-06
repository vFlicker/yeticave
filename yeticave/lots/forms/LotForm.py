from django import forms

from ..models.Lot import Lot


class LotForm(forms.ModelForm):
    class Meta:
        model = Lot
        fields = [
            "title",
            "description",
            "starting_bid",
            "image_url",
            "category",
            "finished_at",
        ]
        widgets = {
            "title": forms.TextInput(attrs={"placeholder": "Enter title"}),
            "description": forms.Textarea(attrs={"placeholder": "Enter description"}),
            "starting_bid": forms.TextInput(attrs={"placeholder": "Enter bid"}),
            "image_url": forms.URLInput(attrs={"placeholder": "Enter image url"}),
            "finished_at": forms.DateTimeInput(
                attrs={"placeholder": "Enter finish date", "type": "datetime-local"},
                format="%y-%m-%d %H:%m",
            ),
        }
