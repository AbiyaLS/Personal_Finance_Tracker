import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation1 from "../../assets/animation1.json";
import { validateEmail } from "../../utils/helper";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../content/UserContent"; // Corrected import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added missing state

  const { updateUser } = useContext(UserContext); // Corrected context name

  const navigate = useNavigate();

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");
    setLoading(true); // Set loading to true while making request

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is set to false after request
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Expense Tracker</h1>
        <div className="h22">Welcome Back</div>
        <p className="p1">Please enter your details to login</p>
        <form onSubmit={handleLogin}>
          {/* Email field */}
          <label>Email Address</label>
          <div>
            <input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              type="email"
              placeholder="example@gmail.com"
              className="input-container"
              disabled={loading} // Disabled while loading
            />
          </div>

          {/* Password Field */}
          <label>Password</label>
          <div>
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="Min 8 Characters"
              className="input-container"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="right-section">
        <Lottie animationData={animation1} loop={true} />
      </div>
    </div>
  );
}
