const express =require("express")
const { addExpense,getExpense,deleteExpense } = require('../controller/expense')
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()
//Add expense to the db
router.post('/add-expense',protect, addExpense)
//Get the data from the db
router.get('/get-expenses',protect,getExpense)
//delete a data from the db
router.delete('/:id',protect ,deleteExpense)

module.exports= router