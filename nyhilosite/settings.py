"""
Django settings for nyhilosite project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""


import os
import environ

from .settings_base import *

# Set environment variables
env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

# Shhhh
SECRET_KEY = os.environ['SECRET_KEY']

# Import correct environment config
current_environment = env('DJANGO_ENVIRONMENT')
if current_environment == 'DEV':
    from .settings_dev import *
elif current_environment == 'PROD':
    from .settings_prod import *