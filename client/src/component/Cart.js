import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  // const { id } = useParams();
  const customerid = localStorage.getItem("customerid");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get(
      `http://localhost:4000/carts/get/${customerid}`
    );
    setCart(res.data);
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/carts/delete/${id}`)
      .then(() => {
        loadData();
        toast.success("book deleted successfully!!");
      })
      .catch(() => {
        toast.error("book not deleted !");
      });
  };
  return (
    <div className="container">
      <Navbar />
      <ToastContainer />
      <div style={{ marginTop: "60px" }}>
        <h2 className=" text-body-tertiary">Cart</h2>
        <table className="table table-responsive ">
          <thead>
            <th></th>
            <th>
              <sup>Bookname</sup>
            </th>
            <th><sup>Author</sup></th>
            <th><sup>Price</sup></th>
            <th className=" float-end"></th>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((x) => (
                <tr key={x}>
                  <td>
                    <img src={x.img}  style={{maxHeight:"60px",maxWidth:"100px",minHeight:"60px",minWidth:"100px"}} className=" rounded-2" alt="Img not found"/>
                  </td>
                  <td>{x.bookname}</td>
                  <td>{x.author}</td>
                  <td><b> ₹ </b>{x.price} /.</td>
                  <td className=" text-end">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(x._id)}
                    >
                      🗑
                    </button>
                    <button className="btn btn-warning">💲</button>
                  </td>
                </tr>
              ))
            ) : (
              <b className="card m-3 p-3">Cart is empty</b>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
