import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./style/Dashboard.css";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import UserProvider, { UserContext } from "./content/UserContent"; 

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


const Root = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  // If user & token exist, go to Dashboard, else Login
  return user && token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

//  Protected Route Wrapper (Prevents Direct Access Without Login)
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};
