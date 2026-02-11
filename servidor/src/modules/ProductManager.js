import fs from 'fs/promises';
import claseGenericaManager from './claseGenericaManager.js';

export default class ProductManager extends claseGenericaManager {
  constructor(filePath) {
    super(filePath);
  }

  async getProducts() {
    const products = await fs.readFile(this.filePath, { encoding: 'utf-8' });
    return JSON.parse(products);
  }

  async getProductById(pid) {
    const products = await this.getProducts();
    return products.find(product => product.id === pid);
  }

  async createProduct(product) {
    const products = await this.getProducts();

    const newProduct = {
      id: products.length
        ? products[products.length - 1].id + 1
        : 1,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails || []
    };

    products.push(newProduct);

    await fs.writeFile(
      this.filePath,
      JSON.stringify(products, null, 2)
    );

    return newProduct;
  }

  async updateProduct(pid, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === pid);

    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updatedFields,
      id: products[index].id 
    };

    await fs.writeFile(
      this.filePath,
      JSON.stringify(products, null, 2)
    );

    return products[index];
  }

  async deleteProduct(pid) {
    const products = await this.getProducts();
    const filteredProducts = products.filter(p => p.id !== pid);

    await fs.writeFile(
      this.filePath,
      JSON.stringify(filteredProducts, null, 2)
    );
  }
}
