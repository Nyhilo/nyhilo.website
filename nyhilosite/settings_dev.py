from .settings_base import *

# Debug mode. Should not be turned on in production
DEBUG = True

# Allowed hosts does not need to be populated in dev
ALLOWED_HOSTS = []

# Url for finding static files. i.e. website.com/static/...
STATIC_URL = 'static/'

# Additional global static files
STATICFILES_DIRS = [
    BASE_DIR / 'assets',  # Assuming BASE_DIR is defined at the top of settings.py
]
