from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('spriteupload/', views.sprite_upload, name='sprite_upload'),
    path('savesprites/', views.saveSprites, name='savesprites'),
    path('api/gamestate/', views.get_current_map, name='get_current_map'),
]
