import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
    customerid:{
        type:String,
        required:true
    },
    bookid:{
        type:String,
        required:true
    },
    bookname:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    
},
{timestamps:true})

const Orders = mongoose.model('order',orderShema)
export default Orders