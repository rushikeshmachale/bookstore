import express  from "express";
import  mongoose  from "mongoose";
import dotenv from 'dotenv'
import crouter from "./routes/customerRoutes.js";
import bookrouter from "./routes/booksRoutes.js";
import cors from 'cors' 
import cartrouter from "./routes/cartRoutes.js";
import orouter from "./routes/ordersRoutes.js";
import nodemailer from 'nodemailer'
import bodyParser from "body-parser";
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected to db'))
.catch((e)=>console.log(e))
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/customers',crouter)
app.use('/books',bookrouter)
app.use('/carts',cartrouter)
app.use('/orders',orouter)

const port = process.env.PORT ||4000

app.listen(port,()=>{
    console.log(`listening to ${port}`);
    // try {
    // } catch (error) {
    //     console.log(error);
    // }
})