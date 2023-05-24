import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const router = Router();

const productManager = new ProductManager()

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

router.post("/", async (req, res) => {
  console.log(req.body);
  const product = req.body;

  productManager.crearProducto(product);
  res.send({ status: "success" });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const info = req.body
  await productManager.actualizarProducto(id, info)
  res.send({ status: "succes" })
})

router.delete('/:id', async (req, res) => {
  await productManager.deleteProduct(req.params.id)
  res.send({ status: "success" });
})

export default router;