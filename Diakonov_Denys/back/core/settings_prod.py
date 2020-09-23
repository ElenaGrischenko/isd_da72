from .settings import *
import os

SECRET_KEY = os.environ["SECRET_KEY"]
ALLOWED_HOSTS = ["lab-templates.herokuapp.com"]

import django_heroku

django_heroku.settings(locals())