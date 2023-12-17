from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class Vet(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='vetuser', default=None)
    vet_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    pet_num = models.IntegerField(default=0)
    clinic_hours = models.TextField()

    def __str__(self):
        return f"Vet Number: {self.vet_id}, Vet Name: {self.user.first_name} {self.user.last_name}"


class Client(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='petowner', default=None)
    client_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    pet_num = models.IntegerField(default=0)

    def __str__(self):
        return f"Client ID: {self.client_id}, Client Name: {self.user.first_name} {self.user.last_name}"


class Pet(models.Model):
    List = (
        (1, 'Dog'),
        (2, 'Cat'),
        (3, 'Bird'),
        (4, 'Fish'),
    )
    gender = (
        (1, 'Male'),
        (2, 'Female')
    )

    pet_id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='pets')
    vet = models.ForeignKey(Vet, on_delete=models.CASCADE, related_name='pet')
    name = models.CharField(max_length=20)
    color = models.CharField(max_length=20, default="")
    months = models.IntegerField()
    years = models.IntegerField()
    type = models.CharField(choices=List, max_length=10, default=1)
    gender = models.CharField(choices=gender, max_length=10, default=1)
    appointments = models.TextField()
    medical_record = models.TextField()
    vaccination = models.TextField()

    def __str__(self):
        return f"Pet Name: {self.name}, Client Name: {self.client.name}, Vet Name: {self.vet.name}"
