const Expense = require("../models/expenseModels")

//Add expense to the db
const addExpense = async (req,res)=>{
    const userId =req.user.id;
try {
    const {category,amount,date}  = req.body
    //validation
    if(!category || !amount || !date){
        return res.status(400).json({
         message : "All Field are required!"
        })
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {  // If date is invalid
        return res.status(400).json({ message: "Invalid date format!" });
    }

    const newExpense = new Expense({
        userId,
        category,amount,
        date: parsedDate
    });
    await newExpense.save()
    res.status(200).json(newExpense); 
} catch (error) {
    res.status(500).json({ message: "Server Error" });
}
}

//get expense from the db
const getExpense =async (req,res)=>{
    const userId =req.user.id;
    try {
        const expenses =await Expense.find({userId}).sort({date : -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}

//delete expense from db
const deleteExpense =async(req,res) =>{
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message : "Expense deleted successfully"})
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}


module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}