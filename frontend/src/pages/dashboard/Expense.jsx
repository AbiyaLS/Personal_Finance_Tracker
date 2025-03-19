import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../style/income/Income.css";
import Models from "../../components/expense/Models";
import AddExpenseForm from "../../components/expense/AddExpenseForm"
import { toast } from "react-toastify"; // Ensure toast is imported
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosinstance";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import ExpenseList from "../../components/expense/ExpenseList";

export default function Expense() {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //------------------------GET ALL EXPENSE DETAILS-------------------------------
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //-------------------------HANDLE ADD EXPENSE----------------------------------------
  const handleAddExpense = async (expense) => {
    const { category, amount, date } = expense;

    if (!category.trim()) {
      toast.error("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, { category, amount, date });

      // Close modal
      setOpenAddExpenseModal(false);

      // ✅ Update state directly for instant UI update
      const newExpense = {
        _id: response.data._id,
        category,
        date: new Date(date).toLocaleDateString(),
        amount: Number(amount),
      };

      setExpenseData((prevData) => [...prevData, newExpense]);

      toast.success("Expense added successfully");
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      toast.error("Failed to add expense. Try again.");
    }
  };

  //---------------------------DELETE THE EXPENSE---------------------------------------------
  const handleDeleteExpense = async (id) => {
    if (!id) return;
  
    try {
      const response = await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id)); 
  
      if (response.status === 200) {
        setExpenseData((prevData) => prevData.filter((expense) => expense._id !== id));
        toast.success("Expense deleted successfully");
      } else {
        throw new Error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
      toast.error("Failed to delete expense. Try again.");
    }
  };
  

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <div className="main-container">
      <div className="navbar">
        <h4>Finance Tracker</h4>
      </div>
      <Sidebar/>
      <div className="income-dasboard">
        <div className="income-overview">
          
            <ExpenseOverview transaction={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
        </div>
        <ExpenseList transaction={expenseData} onDelete={handleDeleteExpense} /> 
      </div>

      {openAddExpenseModal && (
        <Models isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Models>
      )}
    </div>
  );
}
