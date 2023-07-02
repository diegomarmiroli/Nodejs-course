const esLang = {
    decimal: "",
    emptyTable: "No hay información",
    info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
    infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
    infoFiltered: "(Filtrado de _MAX_ total entradas)",
    infoPostFix: "",
    thousands: ",",
    lengthMenu: "Mostrar _MENU_ Entradas",
    loadingRecords: "Cargando...",
    processing: "Procesando...",
    search: "Buscar:",
    zeroRecords: "Sin resultados encontrados",
    paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
    },
};
const table = $("#product_table").DataTable({
    language: esLang,
    columns: [
        {
            title: "Id",
            data: "id",
        },
        {
            title: "Nombre",
            data: "nombre",
        },
        {
            title: "Acciones",
            data: null,
            defaultContent: `
            <div class= "d-flex justify-content-center">
                <button type="button" class="btn btn-outline-info mx-2" id="ver"><i class="fa-regular fa-eye"></i></button>
                <button type="button" class="btn btn-outline-warning mx-2" id="editar"><i class="fa-solid fa-pencil"></i></button>
                <button type="button" class="btn btn-outline-danger mx-2" id="eliminar"><i class="fa-solid fa-trash"></i></button>
            </div>`,
        },
    ],
    ordering: true, // Habilitar ordenamiento
    order: [[0, "asc"]], // Ordenar por la primera columna de forma ascendente
    columnDefs: [
        { targets: [2], orderable: false }, // Deshabilitar ordenamiento en la tercera columna
    ],
    lengthChange: false,
});

document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/products")
        .then((res) => res.json())
        .then((productos) => {
            table.rows.add(productos).draw();
        })
        .catch((err) => console.log(err));
});

const btnAgregar = document.getElementById("addButton");

btnAgregar.addEventListener("click", (e) => {
    const template = document.getElementById("modalTemplate");
    const content = template.content.cloneNode(true);
    const modal = content.querySelector("div.modal");

    const form = content.querySelector("#productForm");

    content.querySelector(".modal-title").innerText = "Inserte nuevo producto";

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const product = {
            nombre: form.nombre.value,
            precio: Number(form.precio.value),
            peso: form.peso.value ? form.peso.value : null,
            descripcion: form.descripcion.value ? form.descripcion.value : null,
        };

        // Envía la solicitud POST al servidor con los datos en el cuerpo como JSON
        fetch("/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Especifica que los datos son de tipo JSON
            },
            body: JSON.stringify(product), // Convierte el objeto a una cadena JSON
        })
            .then(async (res) => {
                if (!res.ok) {
                    // Si la respuesta no es exitosa, rechazamos la promesa con el mensaje de error
                    return res.text().then((errorMessage) => Promise.reject(errorMessage));
                }
                return res.json();
            })
            .then((producto) => {
                table.row.add(producto).draw();
                successModal(`El artículo ${producto.nombre} ha sido agregado correctamente`);
                $(modal).modal("toggle");
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err,
                });
            });
    });

    $(modal).on("hidden.bs.modal", () => {
        modal.remove();
    });

    $(modal).modal("toggle");
});

// Escuchar el evento click en el botón dentro de la tabla
$("#product_table").on("click", "#ver", function () {
    // Obtener la fila padre (tr) del botón en el que se hizo clic
    var row = table.row(this.closest("tr")).data();

    const template = document.getElementById("modalTemplate");
    const content = template.content.cloneNode(true);
    const modal = content.querySelector("div.modal");

    content.querySelector('input[name="nombre"]').value = row.nombre;
    content.querySelector('input[name="nombre"]').disabled = true;
    content.querySelector('input[name="precio"]').value = row.precio;
    content.querySelector('input[name="precio"]').disabled = true;
    content.querySelector('input[name="peso"]').value = row.peso ?? null;
    content.querySelector('input[name="peso"]').disabled = true;
    content.querySelector('textarea[name="descripcion"]').value = row.descripcion ?? null;
    content.querySelector('textarea[name="descripcion"]').disabled = true;

    const form = content.querySelector("#productForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        $(modal).modal("toggle");
        return;
    });

    $(modal).on("hidden.bs.modal", () => {
        modal.remove();
    });

    $(modal).modal("toggle");
});

// Escuchar el evento click en el botón dentro de la tabla
$("#product_table").on("click", "#eliminar", function () {
    // Obtener la fila padre (tr) del botón en el que se hizo clic
    var row = table.row(this.closest("tr")).data();

    // Mostrar el modal de confirmación
    Swal.fire({
        title: "Confirmación",
        text: "¿Estás seguro de que deseas eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        // Si se hace clic en "OK", result.value será true, de lo contrario, será false
        if (result.isConfirmed) {
            // Envía la solicitud POST al servidor con los datos en el cuerpo como JSON
            fetch(`/products/${row.id}`, {
                method: "DELETE",
            })
                .then(async (res) => {
                    if (!res.ok) {
                        // Si la respuesta no es exitosa, rechazamos la promesa con el mensaje de error
                        return res.text().then((errorMessage) => Promise.reject(errorMessage));
                    }
                    return res.json();
                })
                .then((producto) => {
                    successModal(`El artículo ${producto.nombre} ha sido eliminado correctamente`);
                    table.row(this.closest("tr")).remove().draw();
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: err,
                    });
                });
        }
    });
});

// Escuchar el evento click en el botón dentro de la tabla
$("#product_table").on("click", "#editar", function () {
    // Obtener la fila padre (tr) del botón en el que se hizo clic
    var row = table.row(this.closest("tr"));
    let data = row.data();

    const template = document.getElementById("modalTemplate");
    const content = template.content.cloneNode(true);
    const modal = content.querySelector("div.modal");

    const form = content.querySelector("#productForm");

    content.querySelector('input[name="nombre"]').value = data.nombre;
    content.querySelector('input[name="precio"]').value = data.precio;
    content.querySelector('input[name="peso"]').value = data.peso ?? null;
    content.querySelector('textarea[name="descripcion"]').value = data.descripcion ?? null;

    content.querySelector(".modal-title").innerText = "Modificación de producto";

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const product = {
            nombre: form.nombre.value,
            precio: Number(form.precio.value),
            peso: form.peso.value ? form.peso.value : null,
            descripcion: form.descripcion.value ? form.descripcion.value : null,
        };
        // Envía la solicitud POST al servidor con los datos en el cuerpo como JSON
        fetch(`/products/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Especifica que los datos son de tipo JSON
            },
            body: JSON.stringify(product), // Convierte el objeto a una cadena JSON
        })
            .then(async (res) => {
                if (!res.ok) {
                    // Si la respuesta no es exitosa, rechazamos la promesa con el mensaje de error
                    return res.text().then((errorMessage) => Promise.reject(errorMessage));
                }
                return res.json();
            })
            .then((producto) => {
                // Actualizar los datos de la fila en la tabla con los datos del producto modificado
                successModal(`El artículo ${producto.nombre} ha sido modificado correctamente`);
                row.data(producto).draw();
                $(modal).modal("toggle");
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err,
                });
            });
    });

    $(modal).on("hidden.bs.modal", () => {
        modal.remove();
    });

    $(modal).modal("toggle");
});

function successModal(title) {
    Swal.fire({
        icon: "success",
        title: title,
    });
}
