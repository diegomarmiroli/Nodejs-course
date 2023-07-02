const express = require("express");
const path = require("path");
const app = express();

const { getAll, getOneById, insert, update, remove } = require("./data/product.manager.js");

require("dotenv").config(); // Inicializo la obtención de las variables .env
const { SERVER_HOST = "127.0.0.1", SERVER_PORT = 3000 } = process.env;

app.use(express.json()); // Middleware que permite trabajar con JSON en peticiones
app.use(express.urlencoded({ extended: true })); // Middleware que permite trabajar con FORMS Encoded

// Configuración de hacer publico la carpeta de vistas del cliente
app.use(express.static(path.join(__dirname, "..", "public")));

// Configuración inicial para que en el dominio base se obtenga el archivo index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "views", "index.html"));
});

app.get("/products", (req, res) => {
    getAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send(err.message));
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    getOneById(id)
        .then((product) => {
            res.status(200).send(product);
        })
        .catch((err) => res.status(400).send(err.message));
});

app.post("/products", (req, res) => {
    let { nombre, precio, descripcion, peso } = req.body;

    if (!nombre || nombre.trim().length < 5) {
        res.status(400).send("El producto debe contener nombre y debe tener al menos 5 caracteres.");
        return;
    }

    if (isNaN(Number(precio))) {
        res.status(400).send("El precio debe ser un número válido.");
        return;
    } else {
        precio = Number(precio);
    }

    if (descripcion && descripcion.trim().length < 10) {
        res.status(400).send("La descripción del producto debe tener al menos 10 caracteres.");
        return;
    } else {
        descripcion = descripcion !== undefined ? descripcion.trim() : null;
    }

    if (peso !== undefined && isNaN(Number(peso))) {
        res.status(400).send("El peso debe ser un número válido.");
        return;
    } else {
        peso = peso !== undefined ? Number(peso) : null;
    }

    insert({ nombre: nombre.trim(), precio, descripcion, peso })
        .then((product) => {
            res.status(201).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    let { nombre, precio, descripcion, peso } = req.body;

    let data = {};

    if (nombre && nombre.trim().length > 5) {
        data.nombre = nombre.trim();
    } else if (nombre) {
        res.status(400).send("El nombre debe tener al menos 5 caracteres.");
        return;
    }

    if (!isNaN(Number(precio))) {
        data.precio = Number(precio);
    } else if (precio !== undefined) {
        res.status(400).send("El precio debe ser un número válido.");
        return;
    }

    if (descripcion && descripcion.trim().length > 10) {
        data.descripcion = descripcion.trim();
    } else if (descripcion === null) {
        data.descripcion = descripcion;
    } else if (descripcion !== undefined && descripcion !== null) {
        res.status(400).send("La descripción del producto debe tener al menos 10 caracteres.");
        return;
    }

    if (peso === null) {
        data.peso = peso;
    } else if (!isNaN(Number(peso))) {
        data.peso = Number(peso);
    } else if (peso !== undefined) {
        res.status(400).send("El peso debe ser un número válido.");
        return;
    }

    update({ id: Number(id), ...data })
        .then((product) => {
            res.status(200).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    remove(Number(id))
        .then((product) => {
            res.status(200).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

app.use("*", (req, res) => {
    res.status(404).send("No se encontró el recurso.");
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
