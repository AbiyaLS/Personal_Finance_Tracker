import { API_PATH } from "../utils/apiPath";
import axiosInstance from "../utils/axiosinstance";

const uploadImage = async (imageFile) => {
    if (!(imageFile instanceof File)) {
        console.error("Invalid file format. Please upload a valid image.");
        return null;
    }
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
          headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Image Upload Response:", response.data);
        return response.data; // Ensure response includes `imageUrl`
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

export default uploadImage;
