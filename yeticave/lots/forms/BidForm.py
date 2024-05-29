from django import forms

from ..models.Bid import Bid


class BidForm(forms.ModelForm):
    class Meta:
        model = Bid
        fields = ["bid_amount"]
        widgets = {
            "bid_amount": forms.TextInput(attrs={"placeholder": "Enter your bid"}),
        }
