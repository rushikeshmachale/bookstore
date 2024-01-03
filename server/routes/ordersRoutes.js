import express from 'express'
import { addOrder, getAllOrders, getOrderByOrderid, getOrdersByCustomerid, updateOrderByOrderid } from '../controllers/ordersController.js'

const orouter = express.Router()

orouter.get('/get',getAllOrders)
orouter.post('/save',addOrder)
orouter.get('/find/:customerid',getOrdersByCustomerid)
orouter.get('/find/order/:id',getOrderByOrderid)
orouter.put('/update/:id',updateOrderByOrderid)

export default orouter