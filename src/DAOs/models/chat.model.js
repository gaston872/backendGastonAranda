import mongoose from "mongoose";

const collection = 'messages'

const chatSchema = new mongoose.Schema({
    user: {
        type: String
    },
    message: {
        type: String
    }
})

export const chatModel = mongoose.model(collection, chatSchema);