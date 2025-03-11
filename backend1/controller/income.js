const IncomeSchema = require("../models/incomeModels")

//Add income to the db
const addIncome = async (req,res)=>{
  const {title, amount,category,description,date}  = req.body
  const income =IncomeSchema({
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
    await income.save()
    res.status(200).json({ message: "Income Added" }); 
} catch (error) {
    res.status(500).json({ message: "Server Error" });
}
console.log(income)
}

//get income from the db
const getIncome =async (req,res)=>{
    try {
        const incomes =await IncomeSchema.find().sort({createdAt : -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }
}

//delete income from db
const deleteIncome =async(req,res) =>{
    const {id} =req.params
    IncomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message : "Delete Income Successfully"})
    }).catch((error)=>{
        res.status(200).json({message : "Delete Income Successfully"})
    })

    
}


module.exports = {
    addIncome,
    getIncome,
    deleteIncome
}