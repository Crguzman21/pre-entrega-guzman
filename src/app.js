import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import ProductManager from './managers/ProductManager.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager('src/data/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

const products = await productManager.getProducts();
socket.emit('update-products', products);

socket.on('new-product', async (productData) => {
    await productManager.addProduct(productData);
    const updatedProducts = await productManager.getProducts();
    io.emit('update-products', updatedProducts);
});

socket.on('delete-product', async (productId) => {
    await productManager.deleteProduct(productId);
    const updatedProducts = await productManager.getProducts();
    io.emit('update-products', updatedProducts);
});
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
