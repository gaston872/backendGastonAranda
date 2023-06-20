import { Router } from "express";
import ProductManager from "../DAOs/ProductManagerMongo.class.js";
//import ProductManager from "../DAOs/classes/ProductManager.js";
//import ProductManager from "../classes/ProductManager.js";

import socketServer, { pM } from "../server.js";

const router = Router();

let productManager = new ProductManager()

router.get('/', async (req, res) => {
  const productos = await productManager.cargarProductos()
  res.send({ productos })
})

router.get('/:id', async (req, res) => {
  const producto = await productManager.getProductById(req.params.id)
  res.send({ producto })
})

router.get('/', async (req, res) => {
  let limit = parseInt(req.query.limit)

  const productos = await productManager.getProductByLimit(limit)


  res.send({ productos })
})


//
router.post('/api/products/insertion', async (req, res) => {
  const producto = req.body
  productManager.insertarProducto(producto)
  socketServer.emit('products', productManager.cargarProductos())
  console.log(product);
  res.send({ status: "success" });
})
//


router.post("/", async (req, res) => {
  
  let newProduct = req.body;

  await productManager.cargarProductos(newProduct);
  const products = await productManager.getProducts() 
  /* productManager.crearProducto(product); */

  /* req. */socketServer.emit('products', productManager.cargarProductos())
  req.socketServer.sockets.emit('products', products)
  console.log(product);
  res.send({ status: "success" });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const info = req.body
  await productManager.actualizarProducto(id, info)
  /* req. */socketServer.emit('products', productManager.cargarProductos())
  res.send({ status: "succes" })
})

router.delete('/:id', async (req, res) => {
  await productManager.deleteProduct(req.params.id)
  /* req. */socketServer.emit('products', productManager.cargarProductos())
  res.send({ status: "success" });
})

export default router;