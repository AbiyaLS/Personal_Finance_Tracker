import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation1 from "../../../assets/animation1.json"; 
import { validateEmail } from '../../utils/helper';


export default function Login() {

  
  const [email,setEmail] =useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(null);

  const Navigate = useNavigate();

  //Login Function
  const handleLogin =async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
     if(!password){
      setError("Please enter the password")
      return;
     }
     setError("");
     console.log("Logging in...");
  }
  return (
    <div className="login-container">
       <div className="left-section">
    <h1 >Expense Tracker</h1>
     <div className='h22 '>Welcome Back</div>
     <p className='p1'>Please enter your details to login</p>
     <form onSubmit={handleLogin}>
      {/* Email field */}
      <label>Email Address</label>
      <div>
      <input value={email}
      onChange={({target}) => setEmail(target.value)}
      type="email" placeholder="example@gmail.com" className='input-container'/></div>
      {/* Password Field */}
      <label>Password</label>
      <div >
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type="pass" 
              placeholder="Min 8 Characters"
              className='input-container'
            />
          </div>
          {error && <div className="error-message">{error}</div>}
     <button type="submit">LOGIN</button>
     </form>
     <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            SignUp
          </Link>
        </p>
        </div>
        <div className="right-section">
        <Lottie animationData={animation1} loop={true} />
      </div>
    </div>
  )
}
