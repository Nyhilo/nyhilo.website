from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponseBadRequest
from django.http.response import JsonResponse

from .models import StupidPower


def index(request):
    return render(request, 'stupidpowers/index.html')


def powers(request, desc: str = None):
    if request.method == 'GET':
        json = [{'power': s.power, 'ruling': s.ruling} for s in StupidPower.objects.all()]

        return JsonResponse(json, safe=False)

    elif request.method == 'POST':
        if desc is None:
            return HttpResponseBadRequest(
                'Please include a "desc" query param when making a post request to this route')

        StupidPower.objects.create(power=desc)

    return HttpResponseBadRequest('The server does not support that method.')
