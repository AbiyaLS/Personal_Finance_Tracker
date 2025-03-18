import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";
import "../style/ProfilePhotoSelector.css";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Sync previewUrl with image prop (if it's a URL)
  useEffect(() => {
    if (image && typeof image === "string") {
      setPreviewUrl(image);
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get selected file
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setImage(file); // Ensure parent receives correct file
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChangeFile = () => {
    inputRef.current.click();
  };

  // Cleanup old object URLs when component unmounts or when previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className='pic-container'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {!previewUrl ? (
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
