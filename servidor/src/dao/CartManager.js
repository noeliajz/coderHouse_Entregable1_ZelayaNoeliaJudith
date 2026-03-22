import fs from 'fs/promises';

export default class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getCarts() {
    const data = await fs.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newCart = {
      id: carts.length ? carts[carts.length - 1].id + 1 : 1,
      products: []
    };

    carts.push(newCart);

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));

    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === cid);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();

    const cartIndex = carts.findIndex(c => c.id === cid);
    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];

    const productIndex = cart.products.findIndex(p => p.product === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1
      });
    }

    carts[cartIndex] = cart;

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));

    return cart;
  }
}