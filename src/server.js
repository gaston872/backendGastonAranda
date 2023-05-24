import express from 'express'
//import ProductManager from './classes/ProductManager.js'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);

/* const productManager = new ProductManager()

app.get('/products', async (req, res) => {
    const productos = await productManager.cargarProductos()
    res.send({productos})
})

app.get('/products/:id', async (req, res) => {
    const producto = await productManager.getProductById(req.params.id)
    res.send({producto})  
}) */

/* app.get('/productos', async (req, res) => {
    //let limit = parseInt(req.query.limit)
    
    const productos = await productManager.cargarProductos()

    const productosLimitados = productos.slice(0, parseInt(req.query.limit))
    res.send({productosLimitados})
}) */

/* app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit)
    
    const productos = await productManager.getProductByLimit(limit)

    
    res.send({productos})
}) */



app.listen(8080, () => {
    console.log('Servidor levantado');
})