import { Router } from "express";
import CartsManager from "../classes/cartManager.class.js";

const router = Router();
const managerCarts = new CartsManager();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await managerCarts.consultarCartPorId(id);
  res.send(cart);
});

router.get("/", async (req, res) => {
  const carts = await managerCarts.consultarCarts();
  res.send(carts);
});

router.post("/", async (req, res) => {
  await managerCarts.crearCart();
  res.send({ status: "success" });
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  await managerCarts.agregarProductoEnCarrito(cartId, productId);
  res.send({ status: "success" });
});

export default router;