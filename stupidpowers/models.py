from django.db import models


class StupidPower(models.Model):
    power = models.CharField(max_length=200)
    ruling = models.CharField(max_length=2048, default='')
