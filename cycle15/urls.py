from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('spriteupload/', views.sprite_upload, name='sprite_upload'),
    path('savesprite/', views.saveSprite, name='savesprite'),
]
