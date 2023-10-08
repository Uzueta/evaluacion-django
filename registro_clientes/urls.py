from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('registrar/', views.registrar, name="registrar"),
    path('editar/<int:id_cliente>', views.editar, name="editar"),
    path('create/', views.create, name="create"),
    path('update/', views.update, name="update"),
    path('delete/', views.delete, name="delete"),
]
