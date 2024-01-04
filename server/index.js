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
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jocky0909@gmail.com',
      pass: 'tnzd uhwo qjvh bgvm',
    },
  });
  app.post('/send-email', async (req, res) => {
    try {
      // Extract data from the request body
      const { to, subject, text } = req.body;
  
      // Create email options
      const mailOptions = {
        from: 'jocky0909@gmail.com',
        to,
        subject,
        text,
      };
  
      // Send email using Nodemailer
      await transporter.sendMail(mailOptions);
  
      // Respond with success message
      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
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