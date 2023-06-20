import {Router} from 'express';
//import ProductManager from '../DAOs/ProductManagerMongo.class.js';
import socketServer, { pM } from "../server.js";

const router = Router();

router.get('/', async (req, res) => {
    await pM.cargarProductos().then((productos) => {
        res.render('index', { title: "Productos", productos })
    });
});

router.get('/realtimeproducts', async (req, res) => {
    const productos = await pM.cargarProductos();
    socketServer.emit('initProduct', productos);
    res.render('realTimeProducts', { title: "Productos" });
  });

  router.get('/chat', async (req, res) => {
    res.render('chat')
  })

/* router.get('/realtimeproducts', async (req, res) => {
    await pM.cargarProductos().then(() => {
        res.render('realTimeProducts', { title: "Productos" })

    });
}); */

/* router.get('/', (req, res)=>{
    res.render('index');
}) */

export default router;