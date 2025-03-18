import React from "react";
import "../style/FinanceOverview.css"
import CustomBarChart from "./charts/CustomBarchart";

const COLORS = ["#875CF5", "#FA2C2C", "#FF6900"]; // Purple, Red, Orange

export default function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="finance-overview">
      <div className="finance-overview-header">
        <h5>Finance Overview</h5>
      </div>
      <div className="finance-overview-chart">
        <CustomBarChart data={balanceData} colors={COLORS} />
      </div>
    </div>
  );
}
