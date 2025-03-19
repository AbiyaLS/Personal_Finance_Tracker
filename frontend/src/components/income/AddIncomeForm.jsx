import React, { useState } from 'react';
import "../../style/income/IncomeForm.css"

function AddIncomeForm({ onAddIncome }) {
  const [income, setIncome] = useState({ source: "", amount: "", date: "" });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="form-container">
      <label>Income Source</label>
      <input type="text" value={income.source} onChange={(e) => handleChange("source", e.target.value)} placeholder="Freelance, salary, etc..." />

      <label>Amount</label>
      <input type="number" value={income.amount} onChange={(e) => handleChange("amount", e.target.value)} placeholder="Enter amount" />

      <label>Date</label>
      <input type="date" value={income.date} onChange={(e) => handleChange("date", e.target.value)} />

      <button className="submit-btn" onClick={() => onAddIncome(income)}>Add Income</button>
    </div>
  );
}

export default AddIncomeForm;
