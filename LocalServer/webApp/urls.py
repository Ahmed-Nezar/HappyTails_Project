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
    path("petview/<int:id>/", views.viewPet, name="petView"),
    path("about/", views.about, name="about"),
    path('login/', auth_views.LoginView.as_view(template_name='Login.html',
                                               extra_context={'page_name': 'Sign In'}),name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='Logout.html'), name='logout'),
    path("register/", views.signup, name="signup"),
]
