function loaded() {
    let rows = document.querySelectorAll(".clickable-row");

    Array.from(rows).forEach(row => {
        row.addEventListener('click', function (event) {
            if (event.target.type != "checkbox" && !event.target.classList.contains("checkbox")) {
                var destination = this.getAttribute("data-href");
                if (destination)
                    window.location.href = destination;
            }
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
    });

    let checkboxes = document.getElementsByName("seleccion_clientes")

    Array.from(checkboxes).forEach(element => {
        element.addEventListener('change', function () {
            const isChecked = [...checkboxes].some(checkbox => checkbox.checked);

            if (isChecked)
                document.getElementById("btnEliminar").disabled = false;
            else
                document.getElementById("btnEliminar").disabled = true;

        }, false)
    });

    document.getElementById("btnEliminar").addEventListener('click', confirmarEliminar, false);

    function confirmarEliminar() {
        Swal.fire({
            title: '¿Está seguro que desea eliminar los clientes seleccionados?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#dc3545',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed)
                document.getElementById('delete-form').submit();

        })
    }
}

let Toast

function showToast(icon, title) {
    Toast.fire({
        icon: icon,
        title: title
    })
}

document.addEventListener('DOMContentLoaded', loaded, false)