import React from 'react';
import '../style/Dashboard.css'
import Sidebar from '../utils/sidebar';


export default function Dashboard() {
  return (
    <div>
    <Sidebar/>
    <div className='dashboard'>
      <main className='main-content'>
        <header>
          <h2>Personal Finance Tracker</h2>
          <div className='top-metrics'>
            <div className="metric">
              <h3>Total Income</h3><br />
              <p>$59,690</p>
            </div>
            <div className="metric">
              <h3>Total Expense</h3><br />
              <p>$59,690</p>
            </div>
            <div className="metric">
              <h3>Balance</h3><br />
              <p>$59,690</p>
            </div>
          </div>
        </header>
      </main>
    </div>
    </div>
  );
}
