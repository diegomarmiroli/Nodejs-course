const path = require("path");
const { read, write } = require("./file.manager.js");

const file = path.join(__dirname, "products.json");

function getNewId(array) {
    let newId = 0;

    array.forEach((element) => {
        newId = element.id;
    });

    return newId + 1;
}

async function getProducts() {
    const data = await read(file);
    return data;
}

async function getProductById(id) {
    const data = await read(file);

    return data.find((e) => e.id === id);
}

async function insertProduct(element) {
    const products = await read(file);

    const newProduct = { id: getNewId(products), ...element };
    products.push(newProduct);

    await write(products, file);

    return newProduct;
}

module.exports = { getProducts, insertProduct };
