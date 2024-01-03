import axios from "axios";
import React, { useState } from "react";

const FileDemo = () => {
  const [img, setImg] = useState(null);

  const uploadImage = async (type) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = process.env.CLOUD_NAME;
      let resourceType = "image";
      let api = `https://api.cloudinary.com/v1_1/dz2lisia4/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const imgUrl = await uploadImage("image")
    // await axios.post("http://localhost:4000/customers/save")
    setImg(null)
  };
  return (
    <div>
      <input
        type="file"
        accept="image/"
        id="image"
        onChange={(e) => setImg((prev) => e.target.files[0])}
        className=" form-control my-2 "
      />
      <button className="btn btn-info" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileDemo;
