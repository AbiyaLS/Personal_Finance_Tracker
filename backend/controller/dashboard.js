const Income =require("../models/incomeModels")
const Expense =require("../models/expenseModels")
const {isValidObjectId, Types} =require("mongoose");

//dashboard data
const getDashboardData= async (req, res) =>{
    try {
      const userId = req.user.id;
      const userObjectId =new Types.ObjectId(String(userId)) ;
  
      
      // fetch total income 
      const totalIncome = await Income.aggregate([
        { $match: {userId:userObjectId }},
        { $group:{_id: null,total: {$sum: "$amount"}}}
      ]);
    console.log("totalIncome", {totalIncome,userId: isValidObjectId(userId)})
      //fetch total expense
      const totalExpense = await Expense.aggregate([
        { $match: { userId:userObjectId }},
        { $group:{_id: null,total: {$sum: "$amount"}}}
      ]);

     
      //fetch last 5 transaction (income + expense)
      const lastTransaction = [
        ...(await Income.find({ userId }).sort({ date:-1 }).limit(5)).map(
            (tnx) =>({
                ...tnx.toObject(),
                type: "income"
            })
        ),
        ...(await Expense.find({ userId }).sort({ date:-1 }).limit(5)).map(
            (tnx) =>({
                ...tnx.toObject(),
                type: "expense"
            })
        ),
      ].sort((a,b)=> b.date - a.date); //sort latest first

      //final response
      res.json({
        totalBalance:(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome : totalIncome[0]?.total || 0,
        totalExpense : totalExpense[0]?.total || 0,
       
        recentTransaction : lastTransaction
        
      })
    } catch (error) {
        res.status(500).json({message : "Server Error", error})
    }
}
module.exports = {
    getDashboardData
}