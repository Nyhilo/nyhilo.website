from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('passkey', views.check_passkey),
    path('createpower', views.create_power)
]
