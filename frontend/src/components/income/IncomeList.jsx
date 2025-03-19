import React from "react";
import moment from "moment";
import "../../style/income/IncomeList.css";
import { FaTrash } from "react-icons/fa"; // Importing trash icon

function IncomeList({ transaction, onDelete }) {
  return (
    <div className="income-card">
      <div className="income-header">
        <h5 className="income-title">Income List</h5>
      </div>
      <div className="income-grid">
        {transaction.length === 0 ? (
          <p className="no-income">No income records found.</p>
        ) : (
          transaction.map((income) => (
            <div key={income._id} className="income-item">
              <div className="income-details">
                <h4 className="income-source">{income.source}</h4>
                <p className="income-date">{moment(income.date).format("DD MMM YYYY")}</p>
                <p className="income-amount">${income.amount.toFixed(2)}</p>
              </div>
              <button className="delete-btn" onClick={() => onDelete(income._id)}>
                <FaTrash className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default IncomeList;
