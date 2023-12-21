# Generated by Django 4.2 on 2023-12-22 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0015_alter_item_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="item",
            name="type",
            field=models.CharField(
                choices=[
                    ("Dog", "Dog"),
                    ("Cat", "Cat"),
                    ("Bird", "Bird"),
                    ("Fish", "Fish"),
                ],
                default=1,
                max_length=10,
            ),
        ),
    ]