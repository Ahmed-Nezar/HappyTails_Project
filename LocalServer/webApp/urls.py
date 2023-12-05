from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.home, name="home"),
    path("store/", views.store, name="shop"),
    path("vet/", views.vet, name="vet"),
    path("profile/", views.profile, name="profile"),
    path("about/", views.about, name="about"),
    path("login/", views.login, name="login"),
    path("register/", views.signup, name="signup"),
]
