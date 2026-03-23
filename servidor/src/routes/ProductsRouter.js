import { Router } from "express";
/* import ProductManager from '../dao/ProductManager.js';
 */
import { productModel } from "../model/productModel.js";
const router = Router();
/* const productManager = new ProductManager("products.json");
 */
router.get("/", async (req, res) => {
  /*   const products = await productManager.getProducts();
   */
  const products = await productModel.find({});
  res.json(products);
});

/* router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(Number(req.params.pid));

  if (!product) {
    return res.status(404).json({ error: "no se ha encontrado el producto " });
  }

  res.json(product);
});
 */
router.post("/", async (req, res) => {
  const product = req.body;

  /*     await productManager.createProduct(product);
   */
  /*     const products = await productManager.getProducts();
   */

  const newProduct = await productModel.create(product);

  const products = await productModel.find();

  req.app.get("io").emit("products", products);

  res.send("Se agrego el producto");
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  const editado = await productModel.findByIdAndUpdate(pid, req.body, {
    new: true,
  });

  if (!editado) {
    return res.status(404).json({ error: "No se encontró el producto" });
  }

  /*   const products = await productManager.getProducts();
   */
  const products = await productModel.find();

  req.app.get("io").emit("products", products);

  res.json(updated);
});

router.delete("/:pid", async (req, res) => {
  /*   await productManager.deleteProduct(Number(req.params.pid));
   */
  /*   const products = await productManager.getProducts();
   */

  const { pid } = req.params;

  const eliminado = await productModel.findByIdAndDelete(pid);

  if (!eliminado) {
    return res.status(404).json({ error: "No se encontró el producto" });
  }

  const products = await productModel.find();
  req.app.get("io").emit("products", products);

  res.json({ msg: "Producto eliminado" });
});

export default router;
