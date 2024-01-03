import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:String,
        required:true
    },
    reviews:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})

const Books = mongoose.model('books',booksSchema)
export default Books



