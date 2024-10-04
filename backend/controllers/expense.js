const ExpenseSchema = require("../models/ExpenseModel")
exports.addExpense = async (req,res)=>{
    const{title, amount, category, description, date} = req.body;
    const expense = ExpenseSchema({
        title,
        amount,
        date,
        category,
        description
    })
    try{
        //validations
        if(!title || !amount  || !category || !description){
            return res.status(400).json({message:'All fields required'})
        }
        if(amount <=0 || !amount ==='number'){
            return res.status(400).json({message:'Amount must be positive number'})
        }
        await expense.save()
        res.status(200).json({message:'Expense Added'})
    }
    catch(error){
        console.log(error)
        res.status(401).json({message:'Could not add data'})
    }
    console.log(req.body);
}

exports.getExpenses = async (req,res)=>{
    try{
        const expenses = await ExpenseSchema.find().sort({createdAt:-1});
        console.log(expenses);
        res.status(200).json(expenses)
    }
    catch(error){
        res.status(500).json({message:'server Error'});
    }
}
exports.deleteExpense = async (req,res)=>{
   const {id} = req.params;
   ExpenseSchema.findByIdAndDelete(id)
   .then((income)=>{
    res.status(200).json({message:'Expense Deleted'})
   })
   .catch((err)=>{
    
    res.status(500).json({message:'Servor Error'})
   })
}