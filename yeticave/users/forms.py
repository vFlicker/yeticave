from django import forms

from yeticave.users.models import User


class UserCreationForm(forms.ModelForm):
    confirm_password = forms.CharField(
        label="Confirm password",
        widget=forms.PasswordInput(attrs={"placeholder": "Enter password again"}),
    )

    class Meta:
        model = User
        fields = ["username", "email", "password"]
        widgets = {
            "username": forms.TextInput(attrs={"placeholder": "Enter username"}),
            "email": forms.EmailInput(attrs={"placeholder": "Enter email"}),
            "password": forms.PasswordInput(attrs={"placeholder": "Enter password"}),
        }

    def clean(self):
        cleaned_data = super(UserCreationForm, self).clean()

        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password and confirm_password and password != confirm_password:
            self.add_error("confirm_password", "Password does not match")

        return cleaned_data
