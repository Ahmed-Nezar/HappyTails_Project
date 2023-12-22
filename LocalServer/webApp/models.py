from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class Vet(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='vetuser',
                                default=None, blank=True, null=True)
    vet_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    pet_num = models.IntegerField(default=0, blank=True)
    clinic_hours = models.TextField(blank=True)

    def __str__(self):
        if self.user is None:
            return f"Vet Number: {self.vet_id}"
        else:
            return f"Vet Number: {self.vet_id}, Vet Name: {self.user.first_name} {self.user.last_name}"


class Client(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='petowner',
                                default=None, blank=True, null=True)
    client_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    pet_num = models.IntegerField(default=0, blank=True)

    def __str__(self):
        if self.user is None:
            return f"Client ID: {self.client_id}"
        else:
            return f"Client ID: {self.client_id}, Client Name: {self.user.first_name} {self.user.last_name}"


class Pet(models.Model):
    List = (
        ('Dog', 'Dog'),
        ('Cat', 'Cat'),
        ('Bird', 'Bird'),
        ('Fish', 'Fish'),
    )
    gender = (
        ('Male', 'Male'),
        ('Female', 'Female')
    )

    pet_id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='pets', blank=True, null=True)
    vet = models.ForeignKey(Vet, on_delete=models.CASCADE, related_name='pet', blank=True, null=True)
    name = models.CharField(max_length=20)
    color = models.CharField(max_length=20, default="", blank=True)
    months = models.IntegerField(blank=True)
    years = models.IntegerField(blank=True)
    type = models.CharField(choices=List, max_length=10, default=1)
    gender = models.CharField(choices=gender, max_length=10, default=1)
    appointments = models.TextField(blank=True)
    medical_record = models.TextField(blank=True)
    vaccination = models.TextField(blank=True)

    def __str__(self):
        if self.client is None:
            return f"Pet Name: {self.name}"
        else:
            return f"Pet Name: {self.name}, Client Name: {self.client.user.first_name}, " \
                   f"Vet Name: {self.vet.user.first_name}"


class item(models.Model):
    List = (
        ('Dog', 'Dog'),
        ('Cat', 'Cat'),
        ('Bird', 'Bird'),
        ('Fish', 'Fish'),
    )
    name = models.CharField(max_length=20)
    price = models.IntegerField(blank=True)
    description = models.TextField(blank=True, max_length=150)
    img = models.ImageField(upload_to='webApp/static/database/', blank=True, null=True)
    category = models.CharField(max_length=20, default="", blank=True)
    type = models.CharField(choices=List, max_length=10, default=1)
    size = models.CharField(max_length=20, default="", blank=True)

    def __str__(self):
        return self.name


class orderItem(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='order', blank=True, null=True)
    ordered = models.BooleanField(default=False, blank=True)
    item = models.ForeignKey(item, on_delete=models.CASCADE, blank=True)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.name}"
