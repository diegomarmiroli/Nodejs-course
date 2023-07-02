# CRUD de Productos con Express

Este es un proyecto que implementa un CRUD (Crear, Leer, Actualizar, Eliminar) de productos utilizando el framework Node.js llamado Express.

# Endpoints

El CRUD de productos ofrece las siguientes rutas (endpoints) para interactuar con la base de datos:

1. Obtener todos los productos

    > Método: GET
    > Ruta: /products
    > Descripción: Obtiene todos los productos almacenados en la base de datos.
    > Respuesta: Un arreglo JSON con todos los productos.

2. Obtener un producto por ID

    > Método: GET
    > Ruta: /products/:id
    > Descripción: Obtiene un producto específico basado en su ID.
    > Parámetros:
    > :id (parámetro de ruta) - El ID del producto que se desea obtener.
    > Respuesta: Un objeto JSON que representa el producto solicitado.

3. Insertar un nuevo producto

    > Método: POST
    > Ruta: /products
    > Descripción: Inserta un nuevo producto en la base de datos.
    > Cuerpo de la solicitud: Un objeto JSON que representa el nuevo producto con las siguientes propiedades:
    > nombre (string) - El nombre del producto.
    > precio (number) - El precio del producto.
    > peso (number) - El peso del producto.
    > descripcion (string) - La descripción del producto.
    > Respuesta: Un objeto JSON que representa el producto recién creado con su ID generado automáticamente.

4. Actualizar un producto por ID

    > Método: PUT
    > Ruta: /products/:id
    > Descripción: Actualiza un producto existente basado en su ID.
    > Parámetros:
    > :id (parámetro de ruta) - El ID del producto que se desea actualizar.
    > Cuerpo de la solicitud: Un objeto JSON que contiene las propiedades que se desean actualizar del producto. Puede contener una o varias de las siguientes propiedades:
    > nombre (string) - El nuevo nombre del producto.
    > precio (number) - El nuevo precio del producto.
    > peso (number) - El nuevo peso del producto.
    > descripcion (string) - La nueva descripción del producto.
    > Respuesta: Un objeto JSON que representa el producto actualizado.

5. Eliminar un producto por ID
    > Método: DELETE
    > Ruta: /products/:id
    > Descripción: Elimina un producto de la base de datos basado en su ID.
    > Parámetros:
    > :id (parámetro de ruta) - El ID del producto que se desea eliminar.
    > Respuesta: Un objeto JSON que representa el producto eliminado.

Ejemplos de uso

## Obtener todos los productos

```bash

GET /products

```

Respuesta:

```json
[
    {
        "id": 1,
        "nombre": "Producto 1",
        "precio": 10.99,
        "peso": 0.5,
        "descripcion": "Descripción del producto 1"
    },
    {
        "id": 2,
        "nombre": "Producto 2",
        "precio": 25.5,
        "peso": 1.2,
        "descripcion": "Descripción del producto 2"
    }
    // Otros productos...
]
```

## Obtener un producto por ID

```bash

GET /products/1
```

Respuesta:

```json
{
    "id": 1,
    "nombre": "Producto 1",
    "precio": 10.99,
    "peso": 0.5,
    "descripcion": "Descripción del producto 1"
}
```

## Insertar un nuevo producto

```bash

POST /products
```

Cuerpo de la solicitud:

```json
{
    "nombre": "Nuevo Producto",
    "precio": 19.99,
    "peso": 0.8,
    "descripcion": "Descripción del nuevo producto"
}
```

Respuesta:

```json
{
    "id": 3,
    "nombre": "Nuevo Producto",
    "precio": 19.99,
    "peso": 0.8,
    "descripcion": "Descripción del nuevo producto"
}
```

## Actualizar un producto por ID

```bash

PUT /products/2
```

Cuerpo de la solicitud:

```json
{
    "nombre": "Producto Actualizado",
    "precio": 29.99
}
```

Respuesta:

```json
{
    "id": 2,
    "nombre": "Producto Actualizado",
    "precio": 29.99,
    "peso": 1.2,
    "descripcion": "Descripción del producto 2"
}
```

## Eliminar un producto por ID

```bash

DELETE /products/3
```

Respuesta:

```json
{
    "message": "Producto eliminado correctamente"
}
```

# Vista Inicial (HTML, Bootstrap, jQuery, SweetAlert, FontAwesome)

La vista inicial ofrece una interfaz interactiva para gestionar los productos. Cuenta con las siguientes características:

> -   Lista de productos en una tabla con las columnas ID, Nombre, Precio y Acciones.
> -   Funcionalidad para agregar, ver, editar y eliminar productos directamente desde tabla.
> -   Uso de SweetAlert para mostrar confirmaciones antes de eliminar un producto.
> -   Diseño responsive gracias a Bootstrap.
> -   Iconos de FontAwesome para mejorar la experiencia de usuario.

Para comenzar a utilizar la vista inicial, simplemente ingrese a la URL del localhost en tu navegador.
