import React, { useState } from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../components/TransactionInfoCard";
import "../style/Transaction.css";

function RecentTransaction({ transaction = [] }) {
  const [showAll, setShowAll] = useState(false);

  // Show only the first 5 transactions unless "See All" is clicked
  const visibleTransactions = showAll ? transaction : transaction.slice(0, 5);

  return (
    <div className="recent-transactions-container">
      <div className="header">
        <h5 className="text1">Recent Transactions</h5>
        <button1 className="see-all-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "See All"} <LuArrowRight className="icon" />
        </button1>
      </div>

      <div className="transactions-list">
        {visibleTransactions.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentTransaction;
