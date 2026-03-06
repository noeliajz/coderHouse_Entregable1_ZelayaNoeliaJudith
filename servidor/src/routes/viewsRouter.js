const router = Router();
import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";


const productManager = new ProductManager("products.json");

router.get("/tienda", async (req, res) => {

    const products = await productManager.getProducts();

    res.render("products", { products });

});

export default router;