import React from "react";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { MdDelete } from "react-icons/md"; // ✅ Import Delete Icon
import "../style/Transaction.css";

export default function TransactionInfoCard({ title, date, amount, type, }) {
  return (
    <div className="transaction-card">
      <div className="transaction-details">
        <div className="info">
          <p className="transaction-title">{title}</p>
          <p className="transaction-date">{date}</p>
        </div>
        <div className="amount-box">
          <h6 className={type === "income" ? "income-style" : "expense-style"}>
            {type === "income" ? "+" : "-"} ${amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>

      
    </div>
  );
}

