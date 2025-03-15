import { useState } from 'react'

import './components/style/Dashboard.css'
import './components/style/Login.css'
import './components/style/ProfilePhotoSelector.css'
import Dashboard from './components/pages/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Auth/Login'
import SignUp from './components/pages/Auth/SignUp'
import Income from './components/pages/Income'
import Expense from './components/pages/Expense'


function App() {
  return (
    <>
   
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
    </>
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
