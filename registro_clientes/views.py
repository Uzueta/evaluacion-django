from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from .models import Cliente
from django.contrib import messages
from django.core.paginator import Paginator

# Create your views here.

def home(request):
    clientes = Cliente.objects.all().order_by('id')

    paginator = Paginator(clientes, 10)

    page_number = request.GET.get('page')
    registros = paginator.get_page(page_number)

    return render(request, "clientes.html", {"clientes": registros})

def registrar(request):
    cliente_nulo = Cliente()  # EXPLICAR EL POR QUE ESTO
    return render(request, "gestionar_clientes.html", {"accion": "Registrar", "cliente": cliente_nulo})


def editar(request, id_cliente):
    cliente = get_object_or_404(Cliente, id=id_cliente)
    return render(request, "gestionar_clientes.html", {"accion": "Editar", "cliente": cliente})


def create(request):
    if request.method == 'GET':
        return redirect('registrar')
    else:
        nombre = request.POST["cliente_nombre"]
        tipo = request.POST["cliente_tipo"]
        correoelectronico = request.POST["cliente_mail"]
        direccion = request.POST["cliente_direccion"]
        usocfdi = request.POST["cliente_cfdi"]
        rfc = request.POST["cliente_rfc"]
        razonsocial = request.POST["cliente_razon"]

        Cliente.objects.create(nombre=nombre, tipo=tipo, correoelectronico=correoelectronico,
                               direccion=direccion, usocfdi=usocfdi, rfc=rfc, razonsocial=razonsocial)
        
        messages.success(request, 'Cliente registrado')

        return redirect('home')


def update(request):
    if request.method == 'POST':
        id = request.POST["cliente_id"]
        nombre = request.POST["cliente_nombre"]
        tipo = request.POST["cliente_tipo"]
        correoelectronico = request.POST["cliente_mail"]
        direccion = request.POST["cliente_direccion"]
        usocfdi = request.POST["cliente_cfdi"]
        rfc = request.POST["cliente_rfc"]
        razonsocial = request.POST["cliente_razon"]

        cliente = Cliente.objects.get(id=id)
        cliente.nombre = nombre
        cliente.tipo = tipo
        cliente.correoelectronico = correoelectronico
        cliente.direccion = direccion
        cliente.usocfdi = usocfdi
        cliente.rfc = rfc
        cliente.razonsocial = razonsocial

        cliente.save()

        messages.success(request, 'Cliente actualizado')

    return redirect('home')
    
def delete(request):
    if request.method == 'POST':
        clientes_seleccionados = request.POST.getlist('seleccion_clientes')

        Cliente.objects.filter(id__in=clientes_seleccionados).delete()

        messages.success(request, 'Clientes seleccionados eliminados')

    return redirect('home')
