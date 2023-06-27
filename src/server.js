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
    const { nombre, precio, ...params } = req.body;

    insert({ nombre, precio, ...params })
        .then((product) => {
            res.status(201).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    update({ id: Number(id), nombre, precio: Number(precio) })
        .then((product) => {
            res.status(200).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    remove({ id: Number(id) })
        .then((product) => {
            res.status(200).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

app.use("*", (req, res) => {
    res.status(404).send({ message: "No se encontró el recurso." });
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
