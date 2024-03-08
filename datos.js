class Product {
    constructor(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id = 0
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }
  
  class ProductManager {
    constructor() {
      const productsFromStorage = localStorage.getItem('products');
      this.products = productsFromStorage ? JSON.parse(productsFromStorage) : [];
      this.id = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) : 0;
    }
  
    addProduct(product) {
      if (!this.validateProduct(product)) {
        throw new Error("El producto no es válido");
      }
  
      const existingProduct = this.products.find(
        (p) => p.code === product.code
      );
      if (existingProduct) {
        throw new Error("El código del producto ya existe");
      }
  
      this.id++;
      product.id = this.id;
      this.products.push(product);
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    }
  
    updateProduct(id, updatedProduct) {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      this.products[productIndex] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  
    deleteProduct(id) {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      this.products.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  
    validateProduct(product) {
      return (
        product.title &&
        product.description &&
        product.price &&
        product.thumbnail &&
        product.code &&
        product.stock
      );
    }
  }