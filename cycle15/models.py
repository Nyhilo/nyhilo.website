from django.db import models


class Sprite(models.Model):
    user = models.CharField(max_length=64)
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    image = models.CharField(max_length=2**16)  # 64kb
    active = models.BooleanField(default=True)


class MapBackground(models.Model):
    imageData = models.CharField(max_length=2**32)   # 4gb
    created = models.DateTimeField()


class GamestateMap(models.Model):
    imageData = models.CharField(max_length=2**32)
    created = models.DateTimeField()
    filename = models.CharField(max_length=64)
