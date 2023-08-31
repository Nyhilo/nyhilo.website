from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponseBadRequest
from django.http.response import JsonResponse

from .models import StupidPower


def index(request):
    powers = [{'power': s.power, 'ruling': s.ruling} for s in StupidPower.objects.all()]
    return render(request, 'stupidpowers/index.html', {'powers': powers})
