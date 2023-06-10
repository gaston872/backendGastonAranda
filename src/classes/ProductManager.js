import fs from 'fs'
import { v4 as uuidV4 } from "uuid";

export default class ProductManager {

    #products
    #path

    constructor(){
        this.#products = []
        this.#path = './ProductManager/src/classes/files/productos.json'
    }

    getProducts = async () => {
        const products = await this.cargarProductos()
        console.log('Lista de productos:');
        products.forEach(product => {
            console.log(product);
        });
    }

    cargarProductos = async() => {
        if(fs.existsSync(this.#path)){
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)
            return this.#products
        } else {
            return[]
        }
    }

/*     generarId = () => {
        let id
        if(this.#products.length === 0){
            id = 1
        } else {
            id = this.#products[this.#products.length-1].id + 1
        }
        return id
    } */

    saveProducts = async() =>{
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))
    }

    getProductById = async(id) => {
        const products = await this.cargarProductos()
        const productoBuscado = products.find(p=> p.id == id)
        if(!productoBuscado){
            return 'not found'
        } else {
            return productoBuscado
        }
    }

    getProductByLimit = async(limit) => {
        const products = await this.cargarProductos()
        if(limit){ 
            const productosLimitados = products.slice(0, limit)
            return console.log(productosLimitados);
        } else {
            return console.log(products); 
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if(!title || !description ||!price || !thumbnail || !code || !stock) {
            console.error('campos incompletos')
            return
        } else if (this.#products.find(prod => prod.code === code)){
            console.error('ya existe un producto con ese codigo')
            return
        }

        // let id = this.generarId()

        let newProduct = {
            /* id ,*/ title, description, price, thumbnail, code, stock
        }

        this.#products.push(newProduct)

        await this.saveProducts()
        console.log('Se almacenó un producto', newProduct);
        return this.#products
    }

    crearProducto = async (info) => {
        const productos = await this.cargarProductos();
        info.id = uuidV4();
        productos.push(info);
        await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, "\t"));
        return info;
      };

    deleteProduct = async (id) => {
        const products = await this.cargarProductos()
        const index = products.findIndex(product => product.id === id)
        if(index !== -1) {
            const eliminado = products.splice(index, 1)[0]
            for (let i = index; i < products.length; i++) {
                products[i].id = i + 1
            }
            await this.saveProducts()
            console.log('Producto eliminado: ', eliminado);
        } else {
            console.log('Producto no encontrado');
        }
    }

    actualizarProducto = async (id, newInfo) => {
        this.#products = await this.cargarProductos()
        const index = this.#products.findIndex(p=> p.id === id)

        if(index !== -1){
            const updateProduct = { ...this.#products[index], ...newInfo}
            this.#products[index] = updateProduct
            await this.saveProducts()
            console.log('Producto modificado: ', updateProduct);
            return updateProduct
        } else {
            console.log('Producto no encontrado');
            return null
        }
    }
}

const manager = new ProductManager()

/* manager.addProduct('Producto 1', 'Descripcion 1', 10, 'thumbnail1.jpg', 'CODE1', 20);
manager.addProduct('Producto 2', 'Descripcion 2', 20, 'thumbnail2.jpg', 'CODE2', 15);
manager.addProduct('Producto 3', 'Descripcion 3', 15, 'thumbnail3.jpg', 'CODE3', 30);
manager.addProduct('Producto 4', 'Descripcion 4', 25, 'thumbnail4.jpg', 'CODE4', 12);
manager.addProduct('Producto 5', 'Descripcion 5', 27, 'thumbnail5.jpg', 'CODE5', 24);*/ 
//manager.getProductByLimit(1);
//manager.getProducts()


