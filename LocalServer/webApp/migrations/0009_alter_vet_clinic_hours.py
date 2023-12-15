# Generated by Django 4.2 on 2023-12-14 22:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0008_alter_vet_clinic_hours"),
    ]

    operations = [
        migrations.AlterField(
            model_name="vet",
            name="clinic_hours",
            field=models.DateTimeField(
                blank=True,
                default=datetime.datetime(
                    2023, 12, 14, 22, 23, 25, 750400, tzinfo=datetime.timezone.utc
                ),
            ),
        ),
    ]