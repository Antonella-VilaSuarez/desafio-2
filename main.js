import { ProductManager } from "./datos.js";

const app = new Vue({
  el: "#app",
  data: {
    products: [],
    productManager: new ProductManager(),
  },
  methods: {
    addProduct() {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      const thumbnail = document.getElementById("thumbnail").value;
      const code = document.getElementById("code").value;
      const stock = document.getElementById("stock").value;

      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      try {
        this.productManager.addProduct(product);
        this.getProducts();
        alert("Producto agregado correctamente");
      } catch (error) {
        alert(error.message);
      }
    },
    getProducts() {
      this.products = this.productManager.getProducts();
    },
    getProductById(id) {
      try {
        const product = this.productManager.getProductById(id);
        console.log(product);
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
});
