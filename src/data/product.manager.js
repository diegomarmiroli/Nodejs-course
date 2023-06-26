const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "product.json");

function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (error, result) => {
            if (error) reject(new Error("No se puede leer el archivo."));

            resolve(JSON.parse(result));
        });
    });
}

function write(element) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(element, null, "\t"), "utf-8", (error) => {
            if (error) reject(new Error("Hubo un error al insertar el nuevo contenido"));

            resolve(true);
        });
    });
}

function getNewId(array) {
    const newId = 0;

    array.forEach((element) => {
        newId = element.id;
    });

    return newId + 1;
}

async function getAll() {
    const data = await read();
    return data;
}

async function insertNew(element) {
    const data = await leer();

    const newData = { id: getNewId(data), element };

    data.push(element);

    await write(data);

    return newData;
}

module.exports = { getAll, insertNew };
