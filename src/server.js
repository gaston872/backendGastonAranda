import express from 'express'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import handlebars from "express-handlebars";

import ProductManager from './classes/ProductManager.js';

const productManager = new ProductManager()

export const pM = new ProductManager(__dirname + "/files/products.json");

const app = express()
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);

app.use('/', viewsRouter);

app.get('/', async (req, res) => {
    let productos = await productManager.cargarProductos()
    res.render('index', {
        title: "productos",
        products: productos
    })
})

const expressServer = app.listen(8080, () => {
    console.log('Servidor levantado');
})
const socketServer = new Server(expressServer)

const productos = await pM.cargarProductos();

socketServer.on("connection", (socket) => {
    console.log("New connection");
    socket.emit('products', productos);
})

app.use(function (req, res, next) {
    req.socketServer = socketServer;
    next();
})

/* socketServer.on('connection', (socket) => {
    console.log('connected');
    socketServer.emit('initProduct', productos);
    socket.on("message", data => {
        console.log(data);
    })
}) */

export default socketServer;

