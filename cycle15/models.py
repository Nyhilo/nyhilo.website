from django.db import models


class Sprite(models.Model):
    user = models.CharField(max_length=64)
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    image = models.CharField(max_length=2**16)  # 64kb
