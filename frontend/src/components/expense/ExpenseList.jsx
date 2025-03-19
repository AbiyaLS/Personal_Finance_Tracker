import React from "react";
import moment from "moment";
import "../../style/income/IncomeList.css";
import { FaTrash } from "react-icons/fa"; 

function ExpenseList({ transaction, onDelete }) {
  return (
    <div className="income-card">
      <div className="income-header">
        <h5 className="income-title">Expense List</h5>
      </div>
      <div className="income-grid">
        {transaction.length === 0 ? (
          <p className="no-income">No Expense records found.</p>
        ) : (
          transaction.map((expense) => (
            <div key={expense._id} className="income-item">
              <div className="income-details">
                <h4 className="income-source">{expense.category}</h4>
                <p className="income-date">{moment(expense.date).format("DD MMM YYYY")}</p>
                <p className="income-amount">${expense.amount.toFixed(2)}</p>
              </div>
              <button className="delete-btn" onClick={() => onDelete(expense._id)}>
                <FaTrash className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
