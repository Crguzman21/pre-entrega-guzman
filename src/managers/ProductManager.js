import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
constructor(path) {
    this.path = path;
}

async getProducts() {
    try {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async addProduct({ title, price }) {
    const products = await this.getProducts();
    const newProduct = {
        id: uuidv4(),
        title,
        price,
    };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
}

async deleteProduct(id) {
    let products = await this.getProducts();
    products = products.filter(product => product.id !== id);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
}
}

export default ProductManager;
