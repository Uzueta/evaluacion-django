# Generated by Django 4.2.6 on 2023-10-07 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registro_clientes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='razonsocial2',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]