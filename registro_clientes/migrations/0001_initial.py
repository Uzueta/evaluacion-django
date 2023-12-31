# Generated by Django 4.2.6 on 2023-10-07 07:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('tipo', models.CharField(max_length=30)),
                ('correoelectronico', models.CharField(max_length=150)),
                ('direccion', models.TextField()),
                ('usocfdi', models.CharField(max_length=30)),
                ('rfc', models.CharField(max_length=12, validators=[django.core.validators.MinLengthValidator(12, 'El RFC debe contener 12 dígitos')])),
                ('razonsocial', models.CharField(max_length=50)),
            ],
        ),
    ]
