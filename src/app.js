import express from "express";
import CartManager from "./CartManager.js";

const app = express();
app.use(express.json());

const cartManager = new CartManager();

app.get('/', (req, res) => {
    res.send("hola mundo")
})


app.post('/api/carts', async(req, res) => {
    const carts = await cartManager.addCart();
    res.status(201).json({carts, message : "Carrito creado con exito"});
});

app.get('/api/carts/:cid', async(req, res) => {
    const cid = req.params.cid;
    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({products, message : "Productos obtenidos con exito"});
});

app.post('/api/carts/:cid/product/:pid', async(req, res) =>{
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({carts, message : "Producto agregado con exito"});
});

app.listen(8080, () => {
    console.log("Servidor iniciado en el puerto 8080");
});