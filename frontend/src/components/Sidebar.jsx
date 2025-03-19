import React, { useContext } from "react";
import "../style/Sidebar.css"; 
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md"; 
import { FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa"; 
import { GiReceiveMoney } from "react-icons/gi"; 
import { UserContext } from "../content/UserContent";

export default function Sidebar() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="user-section">
        <div className="blue-circle">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Profile" />
          ) : (
            <span className="default-avatar">👤</span>
          )}
        </div>
        <h5 className="username">{user?.fullName || "Guest User"}</h5>
      </div>
      
      <ul className="menu-list">
        <li>
          <Link to="/dashboard">
            <MdDashboard className="profile-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expense">
            <FaMoneyBillWave className="profile-icon" /> Expenses
          </Link>
        </li>
        <li>
          <Link to="/income">
            <GiReceiveMoney className="profile-icon" /> Income
          </Link>
        </li>
        <li onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="profile-icon" /> Logout
        </li>
      </ul>
    </aside>
  );
}
