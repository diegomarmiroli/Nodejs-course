const express = require("express");
const path = require("path");
const app = express();

const { getAll, insertNew } = require("./data/product.manager.js");

require("dotenv").config(); // Inicializo la obtención de las variables .env
const { SERVER_HOST, SERVER_PORT } = process.env;

// Configuración de hacer publico la carpeta de vistas del cliente
app.use(express.static(path.join(__dirname, "..", "public")));

// Configuración inicial para que en el dominio base se obtenga el archivo index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "views", "index.html"));
});

app.get("/products", (req, res) => {
    // // Verificar si la solicitud fue realizada directamente en la URL
    // if (req.originalUrl === "/products") {
    //     // Redireccionar al index
    //     return res.redirect("/");
    // }

    getAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => res.status(400).send(err.message));
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});
