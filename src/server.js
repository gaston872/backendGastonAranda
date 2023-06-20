import express from 'express'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import handlebars from "express-handlebars";

//
//import socketServer from 'socket.io'
//
import ProductManager from './DAOs/ProductManagerMongo.class.js';
//import ProductManager from './DAOs/classes/ProductManager.js';
/* import ProductManager from './classes/ProductManager.js'; */

/* const socketServer = new Server(expressServer)

const productos = await pM.cargarProductos(); */

//const productManager = new ProductManager()
let productManager = new ProductManager()

export const pM = new ProductManager(__dirname + "/files/products.json");

const app = express()
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))



/* app.get('/', async (req, res) => {
    let productos = await productManager.cargarProductos()
    res.render('index', {
        title: "productos",
        products: productos
    })
}) */






const expressServer = app.listen(8080, () => {
    console.log('Servidor levantado');
})
const socketServer = new Server(expressServer)

//const productos = await pM.cargarProductos();

socketServer.on("connection", (socket) => {
    console.log("New connection" + socket.id);
    socket.emit('products', productos);

//CHAT
//ESCUCHA LOS DATOS QUE LE ENVIA EL CLIENTE
socket.on('chat:message', (data) => {
  //EMITE DESDE EL SERVIDOR LOS DATOS
  io.sockets.emit('chat:message', data);
});

//RECIBE LOS DATOS, ESCUCHA EL EVENTO ENVIADO DESDE EL CLIENTE Y ALMACENA LOS DATOS
socket.on('chat:typing', (data) => {
  //ENVIA LOS DATOS A TODOS MENOS A LA INTERFAZ ORIGINAL QUE MANDÓ EL MENSAJE
  socket.broadcast.emit('chat:typing', data);
})
//


/* 
// Agrega la ruta para cargar la página de productos en tiempo real
app.get('/realtimeproducts', async (req, res) => {
    const productos = await pM.cargarProductos();
    res.render('realTimeProducts', { title: "Productos" });
  });
  
  // Agrega la ruta para recibir el formulario y agregar un producto
  app.post('/agregarProducto', async (req, res) => {
    try {
      const { title, description, price, category, thumbnail, stock } = req.body;
      const newProduct = {
        id: uuidV4(),
        title,
        description,
        price: Number(price),
        category,
        thumbnail,
        stock: Number(stock),
      };
      await pM.guardarProducto(newProduct);
      socketServer.emit('newProduct', newProduct);
      res.redirect('/realtimeproducts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar el producto.');
    }
  });
  
  // Agrega la ruta para recibir el ID de un producto y eliminarlo
  app.post('/eliminarProducto', async (req, res) => {
    try {
      const { id } = req.body;
      await pM.eliminarProducto(id);
      socketServer.emit('deleteProduct', id);
      res.redirect('/realtimeproducts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el producto.');
    }
  }); */

})

app.use( (req, res, next) => {
    req.socketServer = socketServer;
    next();
})

//
app.use('/api/products/insertion', routerProducts)
//

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);

app.use('/', viewsRouter/* (socketServer) */);

/* socketServer.on('connection', (socket) => {
    console.log('connected');
    socketServer.emit('initProduct', productos);
    socket.on("message", data => {
        console.log(data);
    })
})
 */
export default socketServer;

