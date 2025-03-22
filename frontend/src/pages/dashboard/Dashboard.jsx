import React, { useEffect, useState } from 'react';
import "../../style/Dashboard.css";
import Sidebar from '../../components/Sidebar';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATH } from '../../utils/apiPath';
import InfoCard from '../../components/InfoCard';
import { FaMoneyBillWave } from "react-icons/fa";
import RecentTransaction from '../../components/RecentTransaction'; 
import FinanceOverview from '../../components/FinanceOverview';

export default function Dashboard() {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const addThousandsSeparate = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="main-container">
      <div className="navbar"><h4>Finance Tracker</h4></div>
      <Sidebar />
      <div className="dashboard-content">
        <div className='boxes'>
        {dashboardData && (
          <>
            <InfoCard
              icon={<FaMoneyBillWave />}
              label="Total Balance"
              value={addThousandsSeparate(dashboardData?.totalBalance || 0)}
              color="bg-purple"
            />
            <InfoCard
              icon={<FaMoneyBillWave />}
              label="Total Income"
              value={addThousandsSeparate(dashboardData?.totalIncome || 0)}
              color="bg-orange"
            />
            <InfoCard
              icon={<FaMoneyBillWave />}
              label="Total Expenses"
              value={addThousandsSeparate(dashboardData?.totalExpense || 0)}
              color="bg-red"
            />
          </>
        )}
        </div>
        <div className="transaction-container">
  <FinanceOverview
    totalBalance={dashboardData?.totalBalance || 0}
    totalIncome={dashboardData?.totalIncome || 0}
    totalExpense={dashboardData?.totalExpense || 0}
  />
  <RecentTransaction
    transaction={dashboardData?.recentTransaction}
    onSeeMore={() => navigate("/expense")}
  />
</div>
      </div>
    </div>
  );
}
