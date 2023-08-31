from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


from .models import StupidPower
from nyhilosite.settings import env


@ensure_csrf_cookie
def index(request):
    powers = [{'power': s.power, 'ruling': s.ruling} for s in StupidPower.objects.all()]
    return render(request, 'stupidpowers/index.html', {'powers': powers})


def check_passkey(request):
    passkey = request.POST.get('passkey', None)

    if env('STUPID_POWER_PASSKEY') == passkey:
        return HttpResponse('true')

    return HttpResponseForbidden('false')


def create_power(request):
    description = request.POST.get('description', None).strip()

    # Check if the power already exists
    if StupidPower.objects.filter(power=description).exists():
        return HttpResponse('NOT added! That power already exists!')

    StupidPower.objects.create(power=description)

    return HttpResponse('Power added! Refresh the page to include it in the list.')
