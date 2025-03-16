const Income = require("../models/incomeModels")

//Add income to the db
const addIncome = async (req,res)=>{
    const userId =req.user.id;
try {
    const {source,amount,date}  = req.body
    //validation
    if(!source || !amount || !date){
        return res.status(400).json({
         message : "All Field are required!"
        })
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {  // If date is invalid
        return res.status(400).json({ message: "Invalid date format!" });
    }
    const newIncome = new Income({
        userId,source,amount,
        date: parsedDate
    });
    await newIncome.save()
    res.status(200).json(newIncome); 
} catch (error) {
    res.status(500).json({ message: "Server Error" });
}
}

//get income from the db
const getIncome =async (req,res)=>{
    const userId =req.user.id;
    try {
        const incomes =await Income.find({userId}).sort({date : -1})
        res.status(200).json(incomes)
    } catch (error) {
        console.error("Error in addIncome:", error);
        res.status(500).json({message : "Server Error"})
    }
}

//delete income from db
const deleteIncome =async(req,res) =>{
    try {
        await Income.findByIdAndDelete(req.params.id)
        res.json({message : "Income deleted successfully"})
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
  
}


module.exports = {
    addIncome,
    getIncome,
    deleteIncome
}