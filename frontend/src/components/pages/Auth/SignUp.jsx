import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation1 from "../../../assets/animation1.json"; 
import ProfilePhotoSelector from '../../utils/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

export default function SignUp() {
  const [profilePic, setProfilePic] = useState('');
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] =useState(null);
  const navigate =useNavigate();

  //SignUp function
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError("");
  
    let profileImageUrl = "";
  
    // Validation checks
    if (!fullName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
  };
  return (
    <div className="login-container">
     <div className="left-section"> 
 <h1 className='h11'>Expense Tracker</h1>
  <div className='h2 '>Create an Account</div>
  <p>Join as today please enter you details below! </p>

  <ProfilePhotoSelector image ={profilePic} setImage={setProfilePic} />
  <form onSubmit={handleSignUp}> 
    {/* Full Name Field */}
  <label>Full Name</label>
   <div>
   <input 
    className='input-container'
   value={fullName}
   onChange={({target}) => setFullName(target.value)}
   type="text" placeholder="Your Name" rqured /></div>  
   {/* Email field */}
    <label>Email Address</label>
   <div>
   <input
    className='input-container' 
   value={email}
   onChange={({target}) => setEmail(target.value)}
   type="email" placeholder="example@gmail.com"  /></div> 
    {/* Password Field  */}
   <label>Password</label>
   <div>
      <input
       className='input-container'
          value={password}
          onChange={({target}) => setPassword(target.value)}
           type="password" 
           placeholder="Min 8 Characters"
          
         />
       </div>
       {error && <div className="error-message">{error}</div>}
  <button type="submit">SIGNUP</button>
  </form>
  <p>
      Already have an account?{" "}
       <Link to="/login" className="signup-link">
         Login
       </Link>
     </p>
     </div>
    <div className="right-section">
      <Lottie animationData={animation1} loop={true} />
  </div> 
  
 </div>

  )
}
