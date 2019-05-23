'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['127.0.0.1']
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
)

STRIPE_PUBLISH_KEY = 'pk_test_fIPmHO5lxk4fFRiahVdem0oF'
STRIPE_SECRET_KEY = 'sk_test_OrQwuL57Skdcm6SvowLXjxmj'
