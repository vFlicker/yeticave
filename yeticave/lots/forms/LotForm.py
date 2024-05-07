from django import forms

from ..models import Lot


class LotForm(forms.ModelForm):
    class Meta:
        model = Lot
        fields = ["title", "description", "starting_bid", "image_url", "category"]
        widgets = {
            "title": forms.TextInput(attrs={"placeholder": "Enter title"}),
            "description": forms.Textarea(attrs={"placeholder": "Enter description"}),
            "starting_bid": forms.TextInput(attrs={"placeholder": "Enter bid"}),
            "image_url": forms.URLInput(attrs={"placeholder": "Enter image url"}),
        }

    def save(self, commit: bool = True) -> Lot:
        lot = super().save(commit=False)

        lot.current_price = lot.starting_bid

        if commit:
            lot.save()

        return lot
