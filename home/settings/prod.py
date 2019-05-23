'''Use this for production'''

from .base import *

DEBUG = False
ALLOWED_HOSTS += ['165.22.94.250']
WSGI_APPLICATION = 'home.wsgi.prod.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'mydb',
        'USER': 'dbuser',
        'PASSWORD': 'donkey123',
        'HOST': 'localhost',
        'PORT': '',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

STRIPE_PUBLISH_KEY = 'pk_test_fIPmHO5lxk4fFRiahVdem0oF'
STRIPE_SECRET_KEY = 'sk_test_OrQwuL57Skdcm6SvowLXjxmj'
