from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload_sprite_image, name='upload_sprite_image'),
    path('savesprites/', views.saveSprites, name='savesprites'),
    path('api/gamestate/', views.get_current_map, name='get_current_map'),
]
