import express  from "express";
import  mongoose  from "mongoose";
import dotenv from 'dotenv'
import crouter from "./routes/customerRoutes.js";
import bookrouter from "./routes/booksRoutes.js";
import cors from 'cors' 
import cartrouter from "./routes/cartRoutes.js";
import orouter from "./routes/ordersRoutes.js";
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected to db'))
.catch((e)=>console.log(e))
app.use(express.json())
app.use(cors())
app.use('/customers',crouter)
app.use('/books',bookrouter)
app.use('/carts',cartrouter)
app.use('/orders',orouter)


app.listen(4000,()=>{
    console.log('listening to 4000');
    // try {
    // } catch (error) {
    //     console.log(error);
    // }
})