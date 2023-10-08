from django.db import models
from django.core.validators import RegexValidator

# Create your models here.


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=30)
    correoelectronico = models.CharField(max_length=150)
    direccion = models.TextField()
    usocfdi = models.CharField(max_length=30)
    rfc = models.CharField(max_length=13)
    razonsocial = models.CharField(max_length=50)
    

    def __str__(self) -> str:
        return self.nombre