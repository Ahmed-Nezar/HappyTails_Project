# Generated by Django 4.2 on 2023-12-14 21:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0003_alter_pet_gender_alter_pet_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pet",
            name="gender",
            field=models.CharField(
                choices=[(1, "Male"), (2, "Female")], default=1, max_length=10
            ),
        ),
        migrations.AlterField(
            model_name="vet",
            name="clinic_hours",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2023, 12, 14, 21, 33, 32, 619777, tzinfo=datetime.timezone.utc
                ),
            ),
        ),
    ]
