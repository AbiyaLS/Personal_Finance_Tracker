import React, { useRef, useState } from 'react';
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";
import "../style/ProfilePhotoSelector.css"


const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Fixed file selection
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChangeFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='pic-container'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {!image ? (
        <div className='img-container'>
          <LuUser className='luuser' />
          <button 
            type='button'
            className='upload-btn'
            onClick={onChangeFile}
          >
            <LuUpload className='upload-icon' />
          </button>
        </div>
      ) : (
        <div className='img-container'>
          <img src={previewUrl} alt='profile' className='profile-img' />
          <button
            type='button'
            className='delete-btn'
            onClick={handleRemoveImage}
          >
            <LuTrash className='delete-icon' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
