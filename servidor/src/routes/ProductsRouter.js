import { Router } from 'express';
import ProductManager from '../modules/ProductManager.js';

const router = Router();
const productManager = new ProductManager('products.json');

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(Number(req.params.pid));

  if (!product) {
    return res.status(404).json({ error: 'no se ha encontrado el producto ' });
  }

  res.json(product);
});

router.post('/', async (req, res) => {
  const newProduct = await productManager.createProduct(req.body);
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const updated = await productManager.updateProduct(
    Number(req.params.pid),
    req.body
  );

  if (!updated) {
    return res.status(404).json({ error: 'no se encontro el producto ' });
  }

  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  await productManager.deleteProduct(Number(req.params.pid));
  res.json({ msg: 'El producto se ha eliminado' });
});

export default router;
