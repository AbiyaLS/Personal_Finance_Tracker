import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATH } from "../../utils/apiPath";
import "../../style/income/IncomeChartOverview.css";

export default function ExpenseOverview({transaction,onAddExpense }) {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.EXPENSE.GET_ALL_EXPENSE);
        if (response.data) {
          setExpenseData(response.data.map((item) => ({
            date: new Date(item.date).toLocaleDateString(),
            amount: item.amount,
          })));
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };
    fetchExpenseDetails();
  }, []);

  return (
    <div className="income-overview-container">
      <h3>Expense Overview</h3>
      <button className="add-income-btn" onClick={onAddExpense}>+ Add Expense</button>
      <p>Track your earnings over time and analyze your expense trends.</p>
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
