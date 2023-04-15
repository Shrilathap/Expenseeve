import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startSetUserProfile } from "../Action/userAction";

const ImageAdd = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePic', file);

    dispatch(startSetUserProfile(formData,setFile))
  };

  return (
    <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type='file' id='profilePic' onChange={handleUpload} />
      <button type='submit'>Upload</button>
    </form>
    </div>
  );
};

export default ImageAdd;
