import hmac
import random

from django.contrib.auth import authenticate
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
import re


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
        'items': item.objects.all(),
    }
    for i in context['items']:
        if str(i.img).__contains__('webApp'):
            i.img = str(i.img)[7:]
            i.save()
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
        'vets': []
    }
    obj = Client.objects.filter(user=request.user).first()
    if obj is not None:
        context['user'] = obj
    for i in Vet.objects.all():
        context['vets'].append(i)
    return render(request, 'profile.html', context)


def editProfile(request):
    context = {
        'errors': [], 'data': []
    }

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=request.user)
        if request.POST.get('username').isnumeric():
            context['errors'].append('Username Cannot Be Entirely Numeric')
        elif not request.POST.get('username'):
            context['errors'].append('Do Not Leave Username Blank')
        if User.objects.filter(username=request.POST.get('username')):
            if request.user.username != request.POST.get('username'):
                context['errors'].append('Username Already Exists')
        testUsr = User.objects.filter(email=request.POST.get('email'))
        if testUsr:
            for i in testUsr:
                if i != request.user:
                    context['errors'].append('Email Already Exists')
        if not request.POST.get('email'):
            context['errors'].append('Do Not Leave Email Blank')
        if  not request.POST.get('email').__contains__('@'):
            context['errors'].append('Invalid Email')
        if not request.POST.get('address'):
            context['errors'].append('Do Not Leave Address Blank')
        if not request.POST.get('phone').isnumeric():
            context['errors'].append('Invalid Phone Number')
        if len(request.POST.get('phone')) != 11:
            context['errors'].append('Phone Number must be 11 digits')
        if request.POST.get('first_name').isnumeric() or request.POST.get('last_name').isnumeric():
            context['errors'].append('First/Last Name Can’t Be Entirely Numeric')
        if not request.POST.get('first_name') or not request.POST.get('last_name'):
            context['errors'].append('Do Not Leave First/Last Name Blank')
        if form.is_valid() and context['errors'] == []:
            obj = Client.objects.get(user=request.user)
            obj.address = request.POST.get('address')
            obj.phone = request.POST.get('phone')
            obj.save()
            form.save()
        return JsonResponse(context)
    ProfileForm(instance=request.user)
    return JsonResponse(context)


def about(request):
    context = {
        'nav': True,
        'page_name': "About",
    }
    return render(request, 'about.html', context)


def check_Login(request):
    context = {
        'nav': True,
        'page_name': "checkLogin",
    }
    msg = []
    msg = []

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Successful authentication
            return JsonResponse({'errors': []})
        else:
            # Authentication failed
            msg.append("Invalid username or password")
            context['errors'] = msg
            return JsonResponse({'errors': msg})
    else:
        # Handle GET request or other methods
        return JsonResponse({'errors': ['Invalid request method']})


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
            Client.objects.create(user=User.objects.get(username=username), address=request.POST.get('address'),
                                  phone=request.POST.get('phone'))
            return redirect('login')
        else:
            # Password Validations
            if form.cleaned_data.get('password2') is None:
                if any(word in form.cleaned_data.get('password1').lower() for word in ['password', '123', 'qwerty']):
                    msg.append(
                        "• Your password can’t be too similar to your other personal information or a commonly used password")
                if not(len(form.cleaned_data.get('password1')) >= 8 and not form.cleaned_data.get('password1').isnumeric()):
                    msg.append("• Your password must contain at least 8 characters and cannot be entirely numeric")
                if re.search(r'\b(\w)\1+\b', form.cleaned_data.get('password1')):  # Checking for repetitive characters
                    msg.append("• Password contains too many repetitive characters")
            else:
                if not form.cleaned_data.get('password1') == form.cleaned_data.get('password2'):
                    msg.append("• Password Doesn't Match")
            # Username Validations
            if User.objects.filter(username__contains=str(request.POST.get('username'))):
                msg.append("• Username Already Exists")
            if str(form.cleaned_data.get('username')).isnumeric():
                msg.append("• Username Must Contain Letters")
            if User.objects.filter(email__contains=str(request.POST.get('email'))):
                msg.append("• Email Already Exists")
        context['errors'] = msg
        context['form'] = form
        return render(request, 'Sign_Up.html', context)
    else:
        form = RegistrationForm()
    context['form'] = form
    return render(request, 'Sign_Up.html', context)


class PasswordChange(PasswordChangeView):
    @property
    def success_url(self):
        return reverse_lazy('login')


def viewPet(request, id):
    context = {
        'nav': True,
        'page_name': "Pet View",
        'pet': []
    }
    if Pet.objects.filter(pet_id=id):
        context['pet'] = Pet.objects.get(pet_id=id)
    return render(request, 'Pet View.html', context)
