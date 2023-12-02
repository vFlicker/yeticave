from django import forms

from .models import Bid, Comment, Listing


class ListingForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ["title", "description", "starting_bid", "image_url", "category"]
        widgets = {
            "title": forms.TextInput(attrs={"placeholder": "Enter title"}),
            "description": forms.Textarea(attrs={"placeholder": "Enter description"}),
            "starting_bid": forms.TextInput(attrs={"placeholder": "Enter bid"}),
            "image_url": forms.URLInput(attrs={"placeholder": "Enter image url"}),
        }


class BidForm(forms.ModelForm):
    class Meta:
        model = Bid
        fields = ["bid_amount"]
        widgets = {
            "bid_amount": forms.TextInput(attrs={"placeholder": "Enter your bid"}),
        }


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ["text"]
        labels = {"text": "Comment"}
        widgets = {
            "text": forms.Textarea(
                attrs={
                    "placeholder": "Enter your comment",
                    "rows": 8,
                }
            ),
        }
