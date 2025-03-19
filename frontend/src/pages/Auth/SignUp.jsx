import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import "../../style/Login.css"
import animation1 from "../../assets/animation1.json";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../content/UserContent";
import uploadImage from "../../utils/uploadImage";


export default function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submission
    setError(null);
    setLoading(true);

    let profileImageUrl = "";

    // Validate input fields
    if (!fullName || !validateEmail(email) || password.length < 8) {
      setError("Please fill in all fields correctly.");
      setLoading(false);
      return;
    }

    // Validate image type before upload
    if (profilePic && !profilePic.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG).");
      setLoading(false);
      return;
    }

    try {
      // Upload Image if selected
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
        if (!profileImageUrl) {
          setError("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImage: profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Finance Tracker</h1>
        <p className="account-p">Create an Account</p>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <form onSubmit={handleSignUp}>
          <label>Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="input-container" required />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input-container" required />

          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input-container" minLength="8" required />

          {error && <p className="error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>{loading ? "Signing Up..." : "SIGN UP"}</button>
        </form>

        <p>Already have an account? <Link to="/login"className="login-link ">Login</Link></p>
      </div>

      <div className="right-section">
        <Lottie animationData={animation1} loop={true} />
      </div>
    </div>
  );
}
