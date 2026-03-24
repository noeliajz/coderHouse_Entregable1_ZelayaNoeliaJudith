import { Router } from "express";
import CartManager from "../dao/CartManager.js";

const router = Router();
/* const cartManager = new CartManager("carts.json");
 */
import { cartModel } from "../model/cartModel.js";


router.post("/", async (req, res) => {

/*   const newCart = await cartManager.createCart();
 */
  const nuevoCarrito = await cartModel.create({})
  
  res.json(nuevoCarrito);
});


router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const carrito = await cartModel.findById(cid).lean();
    if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(carrito);
});

router.post("/:cid/product/:pid", async (req, res) => {
  
    const { cid, pid } = req.params;

    const carrito = await cartModel.findById(cid);

    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const products = carrito.products;

    const productoExistente = products.find(
      p => p.product.toString() === pid
    );

    if (!productoExistente) {
      products.push({ product: pid, quantity: 1 });
    } else {
      productoExistente.quantity += 1;
    }

    await carrito.save();

    res.status(200).json({
      message: "Carrito actualizado",
      carrito
    });

  
});

/*   const updatedCart = await cartManager.addProductToCart(cid, pid);
 */
router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const carrito = await cartModel.findById(cid);
    if (!carrito) {
      return res.status(404).json({ error: "el carrito no se encontro" });
    }
    carrito.products = req.body;
    await carrito.save();
    res.json({ message: "Se actualizo todo el carrito", carrito });
  });

router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const carrito = await cartModel.findById(cid);
    if (!carrito) {
      return res.status(404).json({ error: "No se encontro el carrito indicado" });
    }
    const producto = carrito.products.find(
      p => p.product.toString() === pid
    );
    if (!producto) {
      return res.status(404).json({ error: "Producto no está en el carrito" });
    }
    producto.quantity = quantity;
    await carrito.save();
    res.json({ message: "Se actualizo la cantidad del producto", carrito });
  }) 

router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const carrito = await cartModel.findById(cid);
    if (!carrito) {
      return res.status(404).json({ error: " no se encontro el carrito que indicas" });
    }
    carrito.products = carrito.products.filter(
      p => p.product.toString() !== pid
    );
    await carrito.save();
    res.json({ message: "se ha eliminado el producto del carrito", carrito });
  });
 
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    const carrito = await cartModel.findById(cid);
    if (!carrito) {
      return res.status(404).json({ error: "No se encontro el carrido indicado" });
    }
    carrito.products = [];
    await carrito.save();
    res.json({ message: "Carrito vaciado", carrito });
  });

export default router;