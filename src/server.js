const express = require("express");
const path = require("path");
const app = express();

const { getProducts, insertProduct } = require("./data/product.manager.js");

require("dotenv").config(); // Inicializo la obtención de las variables .env
const { SERVER_HOST, SERVER_PORT } = process.env;

app.use(express.json()); // Middleware que permite trabajar con JSON en peticiones
app.use(express.urlencoded({ extended: true })); // Middleware que permite trabajar con FORMS Encoded

// Configuración de hacer publico la carpeta de vistas del cliente
app.use(express.static(path.join(__dirname, "..", "public")));

// Configuración inicial para que en el dominio base se obtenga el archivo index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "views", "index.html"));
});

app.get("/products", (req, res) => {
    getProducts()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send(err.message));
});

app.post("/products", (req, res) => {
    const { nombre, precio } = req.body;

    insertProduct({ nombre, precio })
        .then((product) => {
            res.status(201).send(JSON.stringify(product));
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
