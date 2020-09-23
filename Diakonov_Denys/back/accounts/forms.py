from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User


class UserCreationForm(forms.ModelForm):
    password = forms.CharField(label="Password", widget=forms.PasswordInput)
    password_confirmation = forms.CharField(
        label="Confirm password", widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = (
            "name",
            "email",
        )

    def clean_password_confirmation(self):
        password = self.cleaned_data.get("password")
        password_confirmation = self.cleaned_data.get("password_confirmation")
        if password and password_confirmation and password != password_confirmation:
            raise forms.ValidationError("Passwords don't match")
        return password_confirmation

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        label="Password",
        help_text='You can change password <a href="../password/">here</a>.',
    )

    class Meta:
        models = User
        fields = (
            "name",
            "email",
            "password",
            "is_admin",
        )

    def clean_password(self):
        return self.initial["password"]
