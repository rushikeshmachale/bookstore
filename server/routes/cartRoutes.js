import express from 'express'
import { addToCart, deleteCartProduct, findbybookname, getCartByCustID, getallcartelements } from '../controllers/cartController.js'

const cartrouter = express.Router()

cartrouter.get('/get/:customerid',getCartByCustID)
cartrouter.post('/add',addToCart)
cartrouter.get('/find',getallcartelements)
cartrouter.get('/find/:bookname',findbybookname)
cartrouter.delete('/delete/:id',deleteCartProduct)

export default cartrouter