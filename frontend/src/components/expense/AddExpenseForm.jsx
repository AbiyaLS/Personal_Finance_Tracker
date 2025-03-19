import React, { useState } from 'react';
import "../../style/income/IncomeForm.css"

function AddExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({ category: "", amount: "", date: "" });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div className="form-container">
      <label>Expense Source</label>
      <input type="text" value={expense.category} onChange={(e) => handleChange("category", e.target.value)} placeholder="Enter the expense" />

      <label>Amount</label>
      <input type="number" value={expense.amount} onChange={(e) => handleChange("amount", e.target.value)} placeholder="Enter amount" />

      <label>Date</label>
      <input type="date" value={expense.date} onChange={(e) => handleChange("date", e.target.value)} />

      <button className="submit-btn" onClick={() => onAddExpense(expense)}>Add Expense</button>
    </div>
  );
}

export default AddExpenseForm;
