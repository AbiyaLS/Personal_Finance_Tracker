import React from 'react'
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animation1 from "../../../assets/animation1.json"; 
// import '../../style/Login.css'
export default function SignUp() {
  return (
    <div className="login-container">
     <div className="left-section"> 
 <h1 >Expense Tracker</h1>
  <div className='h2 '>Create an Account</div>
  <p>Join as today please enter you details below! </p>
  <form > 
  <label>Full Name</label>
   <div>
   <input 
   type="text" placeholder="Your Name" required /></div>  
   {/* Email field */}
    <label>Email Address</label>
   <div>
   <input 
   type="email" placeholder="example@gmail.com" required /></div> 
    {/* Password Field  */}
   <label>Password</label>
   <div>
         <input
           type="pass" 
           placeholder="Min 8 Characters"
           required
         />
       </div>
       {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
  <button type="submit">SIGNUP</button>
  </form>
  <p>
       Don't have an account?{" "}
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
