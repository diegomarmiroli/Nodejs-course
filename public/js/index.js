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
