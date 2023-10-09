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

    let btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.disabled=true;

    if (!validaRFC(document.getElementById("cliente_rfc").value)) {
        form_correcto = false;
        mensaje = "El RFC ingresado no es válido";
    }
    
    if (!validaCorreo(document.getElementById("cliente_mail").value)) {
        form_correcto = false;
        mensaje = "El correo ingresado no es válido";
    }
    
    let info = document.getElementsByClassName("required");
    
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
        btnGuardar.disabled=false;
        return false;
    }

    return true;

}

function validaCorreo(email) {
    const emailPattern = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}

function validaRFC(rfc) {
    const rfcPattern = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][0-9A-Z][0-9A-Z]$/
    /*
       /^[A-Z&Ñ]{3,4} ---> En persona física: 4 letras que representan el nombre; En persona moral: 3 letras que representan la denominación
       \d{6} ---> En persona física: 6 números que representan la fecha de nacimiento; En persona moral: 6 números que representan la fecha de creación
       [A-V1-9][0-9A-Z][0-9A-Z]$/ ---> Tres últimos dígitos que representa la homoclave
    */
      
    return rfcPattern.test(rfc)
}


function showToast(icon, title) {
    Toast.fire({
        icon: icon,
        title: title
    })
}



document.addEventListener('DOMContentLoaded', loaded, false);