const ExpenseSchema = require("../models/ExpenseModel")
const IncomeSchema = require("../models/IncomeModel")

const getStartDateofPreviousYear = ()=>{
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousYear = new Date(startOfMonth.setFullYear(startOfMonth.getFullYear() - 1));
    return startOfPreviousYear;
}
const getMonthYearString = (date) => {
    const options = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};
exports.getanalysis = async(req,res)=>{
    try{
        const startDate = getStartDateofPreviousYear();
        const endDate = new Date();
        const incomes = await IncomeSchema.find();
        const expenses = await ExpenseSchema.find();
        const oneYearIncomes = await IncomeSchema.find({date : {$gte :startDate,$lte:endDate}});
        const oneYearExpenses = await ExpenseSchema.find({date : {$gte :startDate,$lte:endDate}});


        const data = [];
        if(!incomes.length && !expenses.length){
            res.status(401).json({message:'Insuffcient Data to show Analysis'},data=data);
        }
        // const totalIncome = incomes.reduce((a,b)=> a+b.amount,0);
        // const totalExpense = expenses.reduce((a,b)=>a+b.amount,0);
        // const averageIncome = totalIncome/(incomes.length);
        // const averageExpense = totalExpense/(expenses.length);

        const incomeSummary = incomes.reduce((acc,curr)=>{
            if(!acc[curr.category]){
                acc[curr.category] = 0;
            }
            acc[curr.category] += curr.amount;
            return acc;
        },{});

        const expenseSummary = expenses.reduce((acc,curr)=>{
            if(!acc[curr.category]){
                acc[curr.category] = 0;
            }
            acc[curr.category] += curr.amount;
            return acc;
        },{});

        //getting the monthly breakdown 
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        //Initialize arrays to hold the monthly breakdown for the past year
        const monthlyIncomeBreakDown = Array.from({length:12},(_,i)=>{
            const date = new Date(currentYear,currentMonth-i,1);
            return {
                month: date.toLocaleString('default',{month:'long',year:'numeric'}),
                amount: 0
            };
        });

        const monthlyExpenseBreakDown = Array.from({length:12},(_,i)=>{
            const date = new Date(currentYear,currentMonth-i,1);
            return {
                month: date.toLocaleString('default',{month:'long',year:'numeric'}),
                amount: 0,
            };
        });


        //adding the data monthly wise
        incomes.forEach(t=>{
            const transactionDate = new Date(t.date);
            const monthDiff = currentMonth - transactionDate.getMonth() + (currentYear -transactionDate.getFullYear())*12;
            if(monthDiff>=0 && monthDiff<=11){
                monthlyIncomeBreakDown[monthDiff].amount += t.amount;
            }
        });

        expenses.forEach(t=>{
            const transactionDate = new Date(t.date);
            const monthDiff = currentMonth - transactionDate.getMonth() + (currentYear -transactionDate.getFullYear())*12;
            if(monthDiff>=0 && monthDiff<=11){
                monthlyExpenseBreakDown[monthDiff].amount += t.amount;
            }
        });


        //it will have the monthly category wise data for one year
        const monthlyIncomeSummary = {};
        const monthlyExpenseSummary = {};
        oneYearIncomes.map((income)=>{
            const monthYear = getMonthYearString(new Date(income.date));
            if(!monthlyIncomeSummary[monthYear]){
                monthlyIncomeSummary[monthYear]={};
            }
            if(!monthlyIncomeSummary[monthYear][income.category]){
                monthlyIncomeSummary[monthYear][income.category]=0;
            }
            monthlyIncomeSummary[monthYear][income.category] += income.amount;
        })

        oneYearExpenses.map((expense)=>{
            const monthYear = getMonthYearString(new Date(expense.date));
            if(!monthlyExpenseSummary[monthYear]){
                monthlyExpenseSummary[monthYear]={};
            }
            if(!monthlyExpenseSummary[monthYear][expense.category]){
                monthlyExpenseSummary[monthYear][expense.category]=0;
            }
            monthlyExpenseSummary[monthYear][expense.category] += expense.amount;
        })


        res.status(200).json({incomeSummary,expenseSummary,
            monthlyExpenseBreakDown,monthlyIncomeBreakDown,monthlyIncomeSummary,monthlyExpenseSummary});
    }catch(error){
        console.log(error)
        res.status(401).json({message:'Could not perform analysis'})
    }
}