import React, { useState } from "react";
import {ThreeDots} from 'react-loader-spinner'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name:"",email: "", password: "",role:"" });
  const [loading,setLoading] = useState(false)
  const [img,setImg] = useState(null)
  const {name, email, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const uploadImage =async(type)=>{
        const data= new FormData();
        data.append("file",img)
        data.append("upload_preset","images_preset")

        try {
          let cloudName = process.env.REACT_APP_CLOUD_NAME 
          let resourceType = 'image'
          let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

          const res = await axios.post(api,data)
          const {secure_url} = res.data
          console.log(secure_url);
          return secure_url;
        } catch (error) {
          console.log(error);
        }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const imgUrl = await uploadImage("image")
    await axios
      .post("http://localhost:4000/customers/save", {name:name, email:email,img:imgUrl, password:password,role:'user'})
      .then((e) => {
        setImg(null)
        setLoading(false)
        navigate("/");

      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
  };
  return (
    <div className="container">
      <ToastContainer />
      <form action="" className=" form-control my-5 w-50 m-auto">
        <h2 className=" text-center">Register</h2>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          className=" form-control my-2 "
          placeholder="Enter your name"
        />
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          className=" form-control my-2 "
          placeholder="Enter your email"
        />
        <input
          type="file"
          accept="image/"
          id="image"
          onChange={e=>setImg((prev)=>e.target.files[0])}
          className=" form-control my-2 "
        />
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          id="password"
          className=" form-control my-2 "
          placeholder="Enter your password"
        />
        <div className="text-center my-3">
        
          <button className="btn btn-info" onClick={handleSubmit}>
           {loading ? 'Please Wait...':'Signup'} 
          </button>
        </div>
        <div className="text-center my-3">
          <Link to="/" className=" text-decoration-none text-danger">
            Already have an account Signin
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
