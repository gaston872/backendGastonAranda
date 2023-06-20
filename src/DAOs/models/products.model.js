import mongoose from "mongoose";

const collection = 'products'

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
       // required: true
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        //required: true,
    },
    stock: {
        type: Number,
        //required: true
    }
    /* category: {
        type: String,
        //required: true
    }, */
    
})

export const productsModel = mongoose.model(collection, ProductsSchema)