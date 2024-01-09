import base64
import json

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django import forms


from .models import Sprite


# VIEWS #
@ensure_csrf_cookie
def index(request):
    # return HttpResponse('hewwow')
    return render(request, 'cycle15/index.html', {'sprites': Sprite.objects.all()})


def sprite_upload(request):
    if request.method == 'GET':
        return render(request, 'cycle15/spriteupload.html')

    if request.method == 'POST':
        form = SpriteForm(request.POST, request.FILES)
        if form.is_valid():
            username = form.cleaned_data['Username']
            x_position = form.cleaned_data['x_position']
            y_position = form.cleaned_data['y_position']
            file_upload = form.cleaned_data['file_upload']

            if Sprite.objects.filter(user=username).exists():
                return render(request, 'cycle15/spriteupload.html')

            # Convert the uploaded file to base64
            encoded_file = None
            if file_upload:
                encoded_file = base64.b64encode(
                    file_upload.read()).decode('utf-8')

                extension = file_upload._name.split('.')[-1]

                if extension not in ['png', 'jpg', 'jpeg', 'webp']:
                    return HttpResponseBadRequest('Bad file extension. Use png, jpg, or webp')

                file_string = f'data:image/{extension};base64,{encoded_file}'
                print(file_string)

            Sprite.objects.create(
                user=username, x=x_position, y=y_position, image=file_string)

            # Redirect or render a success page
            return render(request, 'cycle15/spriteupload.html')
    else:
        form = SpriteForm()
    return render(request, 'cycle15/spriteupload.html', {})


# POST
def saveSprites(request):
    # Validate the attributes
    data = json.loads(request.body)

    if request.headers['Passkey'] != '':
        return HttpResponseBadRequest('Bad passkey.')

    if data is None or data is []:
        return HttpResponse('No sprites to save.')

    for spriteData in data:
        sprite = Sprite.objects.get(user=spriteData['user'])
        sprite.x = spriteData['x']
        sprite.y = spriteData['y']

        sprite.save()

    return HttpResponse('Sprites saved successfully.')


class SpriteForm(forms.Form):
    Username = forms.CharField(max_length=100)
    x_position = forms.IntegerField()
    y_position = forms.IntegerField()
    file_upload = forms.FileField()
