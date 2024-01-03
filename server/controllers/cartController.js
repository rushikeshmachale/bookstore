import { json } from "express";
import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  //   const { id } = req.params;
  const { customerid, bookid, img, bookname, author, price } = req.body;

  const cart = await new Cart({
    customerid,
    bookid,
    bookname,
    img,
    author,
    price,
  });

  await cart
    .save()
    .then(() => {
      return res.status(200).json(cart);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
};


export const getallcartelements = async (req, res) => {
  try {
    const books = await Cart.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(404).json(error);
  }
};


export const findbybookname=async(req,res)=>{
  const productNameToFind = req.params.bookname;

  const products = await Cart.find({ bookname: { $regex: new RegExp(productNameToFind, 'i') } });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Products not found' });
    }
}
export const getCartByCustID = async (req, res) => {
  const customerIdToFind = req.params.customerid;
  try {
    const products = await Cart.find({ customerid: customerIdToFind });

      res.status(200).json(products);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteCartProduct = async(req,res)=>{
  const {id} = req.params

  if(id){

    await Cart.findByIdAndDelete(id)
    return res.status(200).json('product deleted')
  }else{
    return res.status(400).json('product not found')
  }
}