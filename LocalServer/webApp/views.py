import hmac
import random
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import *
import datetime
from .models import *
from random import randint
from django.contrib.auth.views import *
from django.contrib.admin.models import *
from django.db.models import Count
from django.http import *
from django.contrib import messages


def home(request):
    context = {
        'nav': True,
        'page_name': "Home",
    }
    return render(request, 'index.html', context)


def store(request):
    context = {
        'nav': True,
        'page_name': "Pet Shop",
    }
    return render(request, 'shop.html', context)


def vet(request):
    context = {
        'nav': True,
        'page_name': "Vet",
    }
    return render(request, 'vet.html', context)


def profile(request):
    context = {
        'nav': True,
        'page_name': "Profile",
    }
    return render(request, 'profile.html', context)


def about(request):
    context = {
        'nav': True,
        'page_name': "About",
    }
    return render(request, 'about.html', context)


def login(request):
    context = {
        'nav': True,
        'page_name': "Login",
    }
    return render(request, 'Login.html', context)


def signup(request):
    context = {
        'nav': True,
        'page_name': "Register",
    }
    return render(request, 'Sign_Up.html', context)


def viewPet(request, id):
    context = {
        'nav': True,
        'page_name': "Pet View",
    }
    return render(request, 'Pet View.html', context)
