from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('powers/', views.powers, name='powers')
]
