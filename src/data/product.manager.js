const path = require("path");
const { read, write } = require("./file.manager.js");

const file = path.join(__dirname, "products.json"); // Path to .json File

/*
ESTRUCTURA PRODUCTOS
{
    id: <int>
    nombre:  <string>
    descripcion: <string || null> 
    precio: <float>
    peso: <int || null>
}
*/

function getNewId(array) {
    let newId = 0;

    array.forEach((element) => {
        newId = element.id;
    });

    return newId + 1;
}

async function getAll() {
    const products = await read(file);
    return products;
}

async function getOneById(id) {
    if (!id) throw new Error("Se debe proporcionar un ID para obtener un producto");

    id = Number(id);
    if (!id) throw new Error("El ID proporcionado debe ser un número válido.");

    const products = await read(file);
    const product = products.find((e) => e.id === id);

    if (!product) throw new Error("No existe producto con el ID solicitado");

    return product;
}

async function insert(product) {
    if (!product.nombre.trim() || !product.precio) throw new Error("Faltan datos para agregar un producto");

    validateProduct(product);

    const { nombre, precio, descripcion, peso } = product;

    const products = await read(file);

    const newProduct = {
        id: getNewId(products),
        nombre: nombre.trim(),
        precio: Number(precio),
        descripcion: descripcion.trim(),
        peso: peso === undefined ? null : Number(peso),
    };

    products.push(newProduct);

    await write(products, file);

    return newProduct;
}

async function update(product) {
    if (!product.id) throw new Error("Se debe proporcionar el id del producto a modificar.");
    const products = await read(file);

    let { id, nombre, precio, peso = null, descripcion = null } = product; // Desestructuración del producto

    const index = products.findIndex((e) => e.id === product.id);

    if (index < 0) throw new Error("No se encontró un producto con el id proporcionado.");

    products[index] = product;

    await write(products, file);

    return product;
}

async function remove(product) {
    const products = await read(file);

    const index = products.findIndex((e) => e.id === product.id);

    const deleted = products[index];

    products.splice(index, 1);

    await write(products, file);

    return deleted;
}

function validateProduct({ nombre, descripcion, peso, precio }) {
    if (!nombre.trim().length < 5) {
        throw new Error({ message: "El nombre debe contener más de 5 caracteres." });
    }

    if (descripcion && descripcion.trim().length < 10) {
        throw new Error({ message: "La descripción debe contener más de 10 caracteres." });
    }

    if (peso && isNaN(Number(peso))) {
        throw new Error({ message: "El peso debe ser un número válido." });
    }

    if (precio && isNaN(Number(precio))) {
        throw new Error({ message: "El precio debe ser un importe válido." });
    }
}

module.exports = { getAll, getOneById, insert, update, remove };
