from django import forms

from ..models.Comment import Comment


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ["text"]
        widgets = {
            "text": forms.Textarea(
                attrs={"placeholder": "Enter your comment", "rows": 8}
            ),
        }
