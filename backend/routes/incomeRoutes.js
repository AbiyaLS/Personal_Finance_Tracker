const express =require("express")
const {  addIncome,getIncome,deleteIncome  } = require('../controller/income')
const { protect } = require("../middleware/authMiddleware")


const router = express.Router()
//Add Income to the db
router.post('/add-income',protect,addIncome)
//Get the data from db
router.get('/get-incomes',protect,getIncome) 
//Delete the income from db
router.delete('/:id',protect,deleteIncome)

module.exports= router 