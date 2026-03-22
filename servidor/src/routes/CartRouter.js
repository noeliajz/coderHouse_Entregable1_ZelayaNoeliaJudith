import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const router = Router();
const cartManager = new CartManager("carts.json");


router.post("/", async (req, res) => {

  const newCart = await cartManager.createCart();

  res.json(newCart);
});


router.get("/:cid", async (req, res) => {

  const cart = await cartManager.getCartById(Number(req.params.cid));

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart.products);
});


router.post("/:cid/product/:pid", async (req, res) => {

  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

  const updatedCart = await cartManager.addProductToCart(cid, pid);

  if (!updatedCart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(updatedCart);
});

export default router;