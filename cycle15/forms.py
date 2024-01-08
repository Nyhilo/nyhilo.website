from django import forms


class YourFormName(forms.Form):
    Username = forms.CharField(max_length=100)
    x_position = forms.IntegerField()
    y_position = forms.IntegerField()
    file_upload = forms.FileField()
