const { getExpenses, addExpense, deleteExpense } = require('../controllers/expense')
const {addIncome,getIncomes,deleteIncome} = require('../controllers/income')
const {getanalysis} = require('../controllers/analysis')
const router = require("express").Router()

router.post('/add-income',addIncome)
    .get('/get-incomes',getIncomes)
    .delete('/delete-income/:id',deleteIncome)
    .post('/add-expense',addExpense)
    .get('/get-expenses',getExpenses)
    .delete('/delete-expense/:id',deleteExpense)
    .get('/get-analysis',getanalysis)

module.exports = router