const { addExpense,getExpense, deleteExpense } = require('../controller/expense')
const {  addIncome,  getIncome,deleteIncome } = require('../controller/income')

const router = require('express').Router()
//Add Income to the db
router.post('/add-income',addIncome)
//Get the data from db
router.get('/get-incomes',getIncome)
//Delete the income from db
router.delete('/delete-income/:id',deleteIncome)
//Add expense to the db
router.post('/add-expense',addExpense)
//Get the data from the db
router.get('/get-expenses',getExpense)
//delete a data from the db
router.delete('/delete-expense/:id',deleteExpense)
module.exports= router