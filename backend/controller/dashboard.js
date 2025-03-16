const Income =require("../models/incomeModels")
const Expense =require("../models/expenseModels")
const {isValidObjectId, Types} =require("mongoose");

//dashboard data
const getDashboardData= async (req, res) =>{
    try {
      const userId = req.user.id;
      const userObjectId =new Types.ObjectId(String(userId)) ;
    //   if (!isValidObjectId(userId)) {
    //     return res.status(400).json({ message: "Invalid user ID" });
    // }
      
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

      //Get income transaction in the last 60 days
      const last60daysIncomeTransaction = await Income.find({
        userId,
        date: {$gte: new Date(Date.now() -60 *24 * 60 *60*1000)},
      }).sort({date:-1});

      //get total income from last 60 days
      const incomeLast60days = last60daysIncomeTransaction.reduce(
        (sum,transaction) => sum + transaction.amount,0
      );
       //Get expense transaction in the last 60 days
       const last30daysExpenseTransaction = await Expense.find({
        userId,
        date: {$gte: new Date(Date.now() -30 *24 * 60 *60*1000)},
      }).sort({date:-1});

      //get total expense from last 60 days
      const expenseLast30days = last30daysExpenseTransaction.reduce(
        (sum,transaction) => sum + transaction.amount,0
      );
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
        last30daysExpense:{
            total : expenseLast30days,
            transaction : last30daysExpenseTransaction,
        },
        last60daysIncome:{
            total : incomeLast60days,
            transaction : last60daysIncomeTransaction,
        },
        recentTransaction : lastTransaction
        
      })
    } catch (error) {
        res.status(500).json({message : "Server Error", error})
    }
}
module.exports = {
    getDashboardData
}