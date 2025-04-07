import express from "express";

const app = express();

app.listen(8080, () => {
    console.log("Servidor iniciado en el puerto 8080");
});