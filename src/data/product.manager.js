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
    const products = await read(file);

    const newProduct = {
        id: getNewId(products),
        ...product,
    };

    products.push(newProduct);

    await write(products, file);

    return newProduct;
}

async function update(product) {
    if (!product.id) throw new Error("Se debe proporcionar el id del producto a modificar.");
    if (isNaN(product.id)) throw new Error("Se debe proporcionar un id válido.");

    const products = await read(file);

    const index = products.findIndex((e) => e.id === Number(product.id));

    if (index < 0) throw new Error("No se encontró un producto con el id proporcionado.");

    products[index] = { ...products[index], ...product };

    await write(products, file);

    return products[index];
}

async function remove(id) {
    if (!id) throw new Error("Se debe proporcionar el id del producto a eliminar.");
    if (isNaN(id)) throw new Error("Se debe proporcionar un id válido.");

    const products = await read(file);

    const index = products.findIndex((e) => e.id === id);

    const deleted = products[index];

    products.splice(index, 1);

    await write(products, file);

    return deleted;
}

module.exports = { getAll, getOneById, insert, update, remove };
