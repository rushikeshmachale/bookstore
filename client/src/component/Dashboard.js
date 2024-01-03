import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("user");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/books/find");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/books/delete/${id}`);
      toast.success("Book deleted");
      loadData();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Cannot delete book");
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div style={{ marginTop: "70px" }} className="row d-flex justify-content-center">
        <ToastContainer />
        {books.map((x, index) => (
          <div key={index} className="card col-md-4 col-lg-3 col-sm-6 col-xl-2 m-2 p-0">
          <img
          src={x.img}
          alt={x.bookname}
          className="card-img-top rounded-top img-fluid"
          style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', maxHeight: '350px', objectFit: 'cover', objectPosition: 'center top' }}
        />
            <div className="card-body p-3">
              <div className="text-success">
                <h4 className="card-title">{x.bookname}</h4>
              </div>

              <div className="text-info">
                <i className="text-dark">Author</i> - {x.author}
              </div>

              <div className="fs-6 text-danger">
                {x.ratings} ratings
              </div>

              <div>
                <b>Price ₹</b> {x.price}
              </div>

              <div className="w-75">
                <b>Reviews - </b>
                <p className="text-wrap">{x.reviews}</p>
              </div>
            </div>

          
              <div>
                {role === "admin" ? (
                  <div className="card-text m-2 d-flex justify-content-between align-items-center">
                  <button onClick={() => deleteBook(x._id)} className="btn btn-danger">
                  🗑 
                  </button>
                  <Link to={`/view/${x._id}`} className="btn btn-warning mx-2">
                  👁
                  </Link>
                  </div>
                  
                ) : (
                  <div className="card-text m-2 d-flex justify-content-between align-items-center">
                  <button onClick={() => toast.success("You liked this book")} className="btn btn-danger">
                  ♥ 
                  </button>
                  <Link to={`/view/${x._id}`} className="btn btn-info">
                  🛒 
                </Link>
                  </div>
                )}
              </div>

              <div>
               

               
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
