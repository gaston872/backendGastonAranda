import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ProductManager from "./ProductManagerMongo.class.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://gaston872:32981170axsc@cluster0.svhmcqq.mongodb.net/?retryWrites=true&w=majority')
    productManager = new ProductManager()


  crearCart = async () => {
    const result = await cartModel.create({products: []});
    return result;
  };

  consultarCartPorId = async (id) => {
    const result = await cartModel.findOne({_id: id}).populate('products.product');
    return result;
  };

  obtenerTodos = async () => {
    const result = await cartModel.find({});
    return result;
  };

  agregarProductoEnCarrito = async (idCart, idProduct) => {
    const product = await this.productManager.getProductById(idProduct)
    const cart = await this.consultarCartPorId(idCart)
    cart.products.push({product: product});
    await cart.save()
    return;
};

}
