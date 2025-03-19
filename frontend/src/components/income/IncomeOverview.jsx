import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATH } from "../../utils/apiPath";
import "../../style/income/IncomeChartOverview.css";

export default function IncomeOverview({transaction,onAddIncome }) {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const fetchIncomeDetails = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME);
        if (response.data) {
          setIncomeData(response.data.map((item) => ({
            date: new Date(item.date).toLocaleDateString(),
            amount: item.amount,
          })));
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };
    fetchIncomeDetails();
  }, []);

  return (
    <div className="income-overview-container">
      <h3>Income Overview</h3>
      <button className="add-income-btn" onClick={onAddIncome}>+ Add Income</button>
      <p>Track your earnings over time and analyze your income trends.</p>
      <ResponsiveContainer width="%" height={300}>
        <BarChart data={transaction} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8854d0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
