import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../style/income/Income.css";
import IncomeOverview from "../../components/income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATH } from "../../utils/apiPath";
import Models from "../../components/income/Models";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeList from "../../components/income/IncomeList";
import { toast } from "react-toastify"; // Ensure toast is imported

export default function Income() {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //------------------------GET ALL INCOME DETAILS-------------------------------
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //-------------------------HANDLE ADD INCOME----------------------------------------
  const handleAddIncome = async (income) => {
    const { source, amount, date } = income;

    if (!source.trim()) {
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
      const response = await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, { source, amount, date });

      // Close modal
      setOpenAddIncomeModal(false);

      // ✅ Update state directly for instant UI update
      const newIncome = {
        _id: response.data._id, // Ensure ID is stored for deletion later
        source,
        date: new Date(date).toLocaleDateString(),
        amount: Number(amount),
      };

      setIncomeData((prevData) => [...prevData, newIncome]);

      toast.success("Income added successfully");
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
      toast.error("Failed to add income. Try again.");
    }
  };

  //---------------------------DELETE THE INCOME---------------------------------------------
  const handleDeleteIncome = async (id) => {
    if (!id) return;
  
    try {
      const response = await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id)); // ✅ Call the function with `id`
  
      if (response.status === 200) {
        setIncomeData((prevData) => prevData.filter((income) => income._id !== id));
        toast.success("Income deleted successfully");
      } else {
        throw new Error("Failed to delete income");
      }
    } catch (error) {
      console.error("Error deleting income:", error.response?.data?.message || error.message);
      toast.error("Failed to delete income. Try again.");
    }
  };
  

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <div className="main-container">
      <div className="navbar">
        <h4>Finance Tracker</h4>
      </div>
      <Sidebar />
      <div className="income-dasboard">
        <div className="income-overview">
          <IncomeOverview transaction={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
        </div>
        <IncomeList transaction={incomeData} onDelete={handleDeleteIncome} /> {/* ✅ Pass delete function */}
      </div>

      {openAddIncomeModal && (
        <Models isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Models>
      )}
    </div>
  );
}
