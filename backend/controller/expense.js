const ExpenseSchema = require("../models/expenseModels")

//Add expense to the db
const addExpense = async (req,res)=>{
  const {title, amount,category,description,date}  = req.body
  const expense =ExpenseSchema({
    title, amount, category, description, date
  })
try {
    //validation
    if(!title || !category || !description || !date){
        return res.status(400).json({
         message : "All Field are required!"
        })
    }
    if(amount <= 0 || !amount === "number"){
        return res.status(400).json({
         message : "All Field are required!"
        })
    }
    await expense.save()
    res.status(200).json({ message: "Expense Added" }); 
} catch (error) {
    res.status(500).json({ message: "Server Error" });
}
console.log(expense)
}

//get expense from the db
const getExpense =async (req,res)=>{
    try {
        const expenses =await ExpenseSchema.find().sort({createdAt : -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}

//delete expense from db
const deleteExpense =async(req,res) =>{
    const {id} =req.params
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message : "Delete Expense Successfully"})
    }).catch((error)=>{
        res.status(200).json({message : "Delete Expense Successfully"})
    })

    
}


module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}