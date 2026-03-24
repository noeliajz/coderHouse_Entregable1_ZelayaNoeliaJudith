import { Router } from "express";
/* import ProductManager from "../dao/ProductManager.js";
 */
import { productModel } from "../model/productModel.js";
const router = Router();

/* const productManager = new ProductManager("products.json");
 */

router.get("/tienda", async (req, res) => {
  const { page = 1 } = req.query;

  const pagination = await productModel.paginate(
    {},
    {
      limit: 10,
      page: page,
      lean: true,
    },
  );
  console.log(pagination);
  res.render("products", { pagination });
});

/* router.get("/realtimeproducts", async (req, res) => {
    const { page = 1 } = req.query;

    const pagination = await productModel.paginate({}, {
        limit: 10,
        page: page,
        lean: true
    });

    const products = pagination.docs;
    req.app.get("io").emit("products", products);
    res.render("realTimeProducts", { pagination });
}); */
router.get("/realtimeproducts", async (req, res) => {
  const { page = 1 } = req.query;

  const pagination = await productModel.paginate(
    {},
    {
      limit: 10,
      page: page,
      lean: true,
    },
  );

  res.render("realTimeProducts", { pagination });
});

router.get("/", async (req, res) => {
  const { page = 1, category } = req.query;
  let query = {};
  if (category) {
    query.category = category;
  }

  const pagination = await productModel.paginate(
    {},
    {
      limit: 10,
      page: page,
      lean: true,
    },
  );
  res.render("index", { pagination });
  /*   res.render("home", { pagination });
   */
});

router.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productModel.findById(pid).lean();
  res.render("masInfoProducto", { product });
});
export default router;
