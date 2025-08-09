import base64
import json
from datetime import datetime


from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django import forms


from .models import Sprite, MapBackground, GamestateMap
from .c15image import generate_gamestate_map, get_gamestate_map
from nyhilosite.settings import env


# VIEWS #
@ensure_csrf_cookie
def index(request):
    sprites = Sprite.objects.all()
    background = MapBackground.objects.last()
    return render(request, 'cycle15/index.html', {'background': background, 'sprites': sprites})


def upload(request):
    if request.method == 'GET':
        return render(request, 'cycle15/upload.html')


# POST
def upload_sprite_image(request):
    if request.method == 'POST':
        form = SpriteForm(request.POST, request.FILES)
        if form.is_valid():
            username = form.cleaned_data['Username']
            file_upload = form.cleaned_data['file_upload']

            if Sprite.objects.filter(user=username).exists():
                return render(request, 'cycle15/upload.html')

            # Convert the uploaded file to base64
            encoded_file = None
            if file_upload:
                encoded_file = base64.b64encode(
                    file_upload.read()).decode('utf-8')

                extension = file_upload._name.split('.')[-1]

                if extension not in ['png', 'jpg', 'jpeg', 'webp']:
                    return HttpResponseBadRequest('Bad file extension. Use png, jpg, or webp')

                file_string = f'data:image/{extension};base64,{encoded_file}'

            Sprite.objects.create(user=username, x=0, y=0, image=file_string)

            # Redirect back to upload page
            return render(request, 'cycle15/upload.html')

    return render(request, 'cycle15/upload.html', {})


def upload_background_image(request):
    if request.method == 'POST':
        form = BackgroundForm(request.POST, request.FILES)
        if form.is_valid():
            file_upload = form.cleaned_data['file_upload']

            # Convert the uploaded file to base64
            encoded_file = None
            if file_upload:
                encoded_file = base64.b64encode(
                    file_upload.read()).decode('utf-8')

                extension = file_upload._name.split('.')[-1]

                if extension not in ['png', 'jpg', 'jpeg', 'webp']:
                    return HttpResponseBadRequest('Bad file extension. Use png, jpg, or webp')

                file_string = f'data:image/{extension};base64,{encoded_file}'

            MapBackground.objects.create(imageData=file_string, created=datetime.utcnow())

            # Redirect back to upload page
            return render(request, 'cycle15/upload.html')

    return render(request, 'cycle15/upload.html', {})


def saveSprites(request):
    # Validate the attributes
    data = json.loads(request.body)

    if request.headers['Passkey'] != env('CYCLE_15_PASSKEY'):
        return HttpResponseBadRequest('Bad passkey.')

    if data is None or data == []:
        return HttpResponse('No sprites to save.')

    for spriteData in data:
        sprite = Sprite.objects.get(user=spriteData['user'])
        sprite.x = spriteData['x']
        sprite.y = spriteData['y']

        sprite.save()

    # Save the constructed image for the api
    background = MapBackground.objects.last()
    sprites = Sprite.objects.all()
    b64_string = generate_gamestate_map(background, sprites)
    GamestateMap.objects.create(
        filename=datetime.utcnow().strftime('%Y-%m-%d_%H%M%S'),
        imageData=b64_string,
        created=datetime.utcnow())

    return HttpResponse(f'Saved {len(data)} sprite{"s" if len(data) > 1 else ""}.')


# API
def get_current_map(request):
    map = GamestateMap.objects.last()
    image = get_gamestate_map(map)

    response = HttpResponse(content_type="image/png")
    image.save(response, 'PNG')

    return response


class SpriteForm(forms.Form):
    Username = forms.CharField(max_length=100)
    file_upload = forms.FileField()


class BackgroundForm(forms.Form):
    file_upload = forms.FileField()