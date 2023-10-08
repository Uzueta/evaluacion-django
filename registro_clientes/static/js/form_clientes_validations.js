function loaded() {
    let info = document.getElementsByClassName("required");

    Array.from(info).forEach(element => {
        element.addEventListener('input', function () {
            if (this.name == "cliente_tipo")
                document.getElementById("div_tipo").classList.remove("missing-data")
            else
                this.classList.remove("missing-data")
        }, false);
    });

    Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}

let Toast

function validarFormulario(event) {
    let form_correcto = true;
    let mensaje = "";

    let info = document.getElementsByClassName("required");

    if (document.getElementById("cliente_rfc").value.length < 13) {
        form_correcto = false;
        mensaje = "Se requieren 13 dígitos para el RFC";
    }

    Array.from(info).forEach(element => {
        if (element.name == "cliente_tipo") {
            tipo = document.querySelector("input[type='radio'][name=cliente_tipo]:checked")?.value ?? '';
            if (tipo.trim() == "") {
                form_correcto = false;
                document.getElementById("div_tipo").classList.add("missing-data")
                mensaje = "Es necesario llenar los campos indicados para continuar";
            }
        }
        else if (element.value.trim() == "") {
            form_correcto = false;
            element.classList.add("missing-data");
            mensaje = "Es necesario llenar los campos indicados para continuar";
        }
    });

    if (!form_correcto) {
        event.preventDefault();
        showToast("warning", mensaje)
        return false;
    }

    return true;

}

function showToast(icon, title) {
    Toast.fire({
        icon: icon,
        title: title
    })
}



document.addEventListener('DOMContentLoaded', loaded, false);