const fs = require("fs");

function read(file) {
    return new Promise((resolve, reject) => {
        if (!file) reject(new Error("No se proporcionó archivo a leer."));

        fs.readFile(file, "utf8", (error, result) => {
            if (error) reject(new Error("No se puede leer el archivo."));
            resolve(JSON.parse(result));
        });
    });
}

function write(element, file) {
    return new Promise((resolve, reject) => {
        if (!element) reject(new Error("No hay nuevo elemento a insertar."));
        if (!file) reject(new Error("No se proporcionó archivo a modificar"));

        fs.writeFile(file, JSON.stringify(element, null, "\t"), "utf-8", (error) => {
            if (error) reject(new Error("Hubo un error al insertar el nuevo contenido"));

            resolve(true);
        });
    });
}

module.exports = { read, write };
