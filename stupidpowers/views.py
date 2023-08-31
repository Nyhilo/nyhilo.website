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
        return HttpResponse(passkey)

    return HttpResponseForbidden('false')


def create_power(request):
    # Check if the request contains the passkey. This is how oauth works, right?
    passkey = request.POST.get('key', None)
    if env('STUPID_POWER_PASSKEY') != passkey:
        return HttpResponse('Ah, ah, ah. ☝️ Gotta be sneakier.')

    # Validate that a description was provided
    description = request.POST.get('description', None)
    if description is None:
        return HttpResponse('You gotta give something to me, man.')

    # Check if the power already exists
    if StupidPower.objects.filter(power=description.strip()).exists():
        return HttpResponse('NOT added! That power already exists!')

    StupidPower.objects.create(power=description)

    return HttpResponse('Power added! Refresh the page to include it in the list.')
