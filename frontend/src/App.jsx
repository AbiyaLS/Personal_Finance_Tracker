import { useState } from 'react'

import "./style/Dashboard.css"
import "./style/Login.css"
import Dashboard from './pages/dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Income from './pages/dashboard/Income'
import Expense from './pages/dashboard/Expense'
import UserProvider from './content/UserContent';


function App() {
  return (
   <UserProvider>
    <div>
      <Router>
        <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path ='/login' exact element={<Login/>} />
        <Route path ='/signup' exact element={<SignUp/>} />
        <Route path ='/dashboard' exact element={ <Dashboard/>} />
        <Route path ='/income' exact element={ <Income/>} />
        <Route path ='/expense' exact element={ <Expense/>} />
        </Routes>
      </Router>
    </div>
    </UserProvider>

  )
} 

export default App

const Root =() =>{
  //Check if token exist in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenicated,otherwise to login
  return isAuthenticated ? (
    <Navigate to ="/dashboard"/>
  ) : (
     <Navigate to ="login"/>
  );

}
