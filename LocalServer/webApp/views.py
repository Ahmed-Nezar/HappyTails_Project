import hmac
import random
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import *
import datetime
from .forms import *
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


def signup(request):
    context = {
        'nav': True,
        'page_name': "Register"
    }
    msg = []
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, "{x} is Created Successfully".format(x=username))
            return redirect('login')
        else:
            if not form.cleaned_data.get('password1') == form.cleaned_data.get('password2'):
                msg.append("Password Doesn't Match")
            if User.objects.filter(username__contains=str(request.POST.get('username'))):
                msg.append("Username Already Exists")
            if str(form.cleaned_data.get('username')).isnumeric():
                msg.append("Username Must Contain Letters")
            if User.objects.filter(email__contains=str(request.POST.get('email'))):
                msg.append("Email Already Exists")
        context['errors'] = msg
        context['form'] = form
        return render(request, 'Sign_Up.html', context)
    else:
        form = RegistrationForm()
    context['form'] = form
    return render(request, 'Sign_Up.html', context)


def registration(request):
    msg = []
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, "{x} is Created Successfully".format(x=username))
            return redirect('login')
        else:
            if not form.cleaned_data.get('password1') == form.cleaned_data.get('password2'):
                msg.append("Password Doesn't Match :(")
            if User.objects.filter(username__contains=str(request.POST.get('username'))):
                msg.append("Username Already Exists :(")
            if str(form.cleaned_data.get('username')).isnumeric():
                msg.append("Username Must Contain Letters :(")
            if User.objects.filter(email__contains=str(request.POST.get('email'))):
                msg.append("Email Already Exists :(")
        return render(request, 'shoes/registration.html', {'form': form, 'page_name': 'Sign Up', 'errors': msg})
    else:
        form = RegistrationForm()
    return render(request, 'shoes/registration.html', {'form': form, 'page_name': 'Sign Up'})


class PasswordChange(PasswordChangeView):
    @property
    def success_url(self):
        return reverse_lazy('login')


def viewPet(request, id):
    context = {
        'nav': True,
        'page_name': "Pet View",
    }
    return render(request, 'Pet View.html', context)
