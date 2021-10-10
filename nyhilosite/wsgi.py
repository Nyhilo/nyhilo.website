import os
import sys
sys.path.append(os.getenv('WSGI_SYS_PATH'))
os.environ.setdefault('PYTHON_EGG_CACHE', os.getenv('PYTHON_EGG_CACHE'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nyhilosite.settings')
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()