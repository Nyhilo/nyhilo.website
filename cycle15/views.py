from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    # return HttpResponse('hewwow')
    return render(request, 'cycle15/index.html', {})
