const MonthlyBudget =
require("../models/MonthlyBudget");

exports.createBudget =
async(req,res)=>{

 const budget =
 await MonthlyBudget.create({

  user:req.userId,

  ...req.body

 });

 res.status(201).json(budget);

};

exports.getBudgets =
async(req,res)=>{

 const budgets =
 await MonthlyBudget.find({
  user:req.userId
 });

 res.json(budgets);

};

exports.updateBudget =
async(req,res)=>{

 const budget =
 await MonthlyBudget.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
 );

 res.json(budget);

};

exports.deleteBudget =
async(req,res)=>{

 await MonthlyBudget.findByIdAndDelete(
  req.params.id
 );

 res.json({
  message:"Deleted"
 });

};