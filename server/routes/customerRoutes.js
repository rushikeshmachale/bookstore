import express from "express";
import { addCustomer, addCustomers, getCustomerByid, getCustomers, loginUser, sendMail, updateCustomer } from "../controllers/customerControllers.js";

const crouter = express.Router()


crouter.get('/',getCustomers)
crouter.get('/find/:id',getCustomerByid)
crouter.put('/edit/:id',updateCustomer)
crouter.post('/save',addCustomer)
crouter.post('/login',loginUser)
crouter.post('/send',sendMail)
crouter.post('/save/list',addCustomers)

export default crouter