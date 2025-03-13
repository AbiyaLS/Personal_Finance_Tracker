import React from 'react';
import '../style/Sidebar.css';
import logo from '../../assets/logo.png';
import icon1 from '../../assets/dashboard.png';
import icon2 from '../../assets/income.png'
import icon3 from '../../assets/expense.png';
import icon4 from '../../assets/budget.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
       <div className="sidebar-header">
        <img src={logo} alt="logo" className="logo" /><br/>
        FinMoniTrack
      </div> 
      <main className='main'>
        <div className='menu'>
        <div className='menu-item'>
        <img src={icon1} alt="Dashboard Icon" className="icon" />
        <p>DashBoard</p>
        </div>
        <div className='menu-item'>
        <img src={icon2} alt="income Icon" className="icon" />
        <p>Income</p>
        </div>
        <div className='menu-item'>
        <img src={icon3} alt="Expense Icon" className="icon" />
        <p>Expense</p>
        </div>
        <div className='menu-item'>
        <img src={icon4} alt="Budget Icon" className="icon" />
        <p>Budget</p>
        </div>
        </div>
      </main>
    
    </div>
  );
};

export default Sidebar;
