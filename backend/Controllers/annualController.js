const supabase =
require("../Config/supabase");

/* GET ALL */

exports.getBudgets = async (req,res)=>{

 try{

  const { data,error } =
  await supabase
  .from("annual_budgets")
  .select("*")
  .eq("user_id", req.userId);

  if(error) throw error;

  res.json(data);

 }
 catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

/* GET ONE */

exports.getBudgetById = async(req,res)=>{

 try{

  const { data,error } =
  await supabase
  .from("annual_budgets")
  .select("*")
  .eq("id",req.params.id)
  .eq("user_id",req.userId)
  .single();

  if(error) throw error;

  res.json(data);

 }
 catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

/* CREATE */

exports.createBudget = async(req,res)=>{

 try{

  const {
   year,
   totalIncome,
   totalExpense,
   savings
  } = req.body;

  const { data,error } =
  await supabase
  .from("annual_budgets")
  .insert([
   {
    user_id:req.userId,
    year:Number(year),
    total_income:Number(totalIncome),
    total_expense:Number(totalExpense),
    savings:Number(savings)
   }
  ])
  .select();

  if(error) throw error;

  res.status(201).json(data[0]);

 }
 catch(error){

  console.log("ANNUAL INSERT ERROR:", error);

  res.status(500).json({
   message:error.message
  });

 }

};

exports.updateBudget = async(req,res)=>{

 try{

  const {
   year,
   totalIncome,
   totalExpense,
   savings
  } = req.body;

  const { data,error } =
  await supabase
  .from("annual_budgets")
  .update({
   year: Number(year),
   total_income: Number(totalIncome),
   total_expense: Number(totalExpense),
   savings: Number(savings)
  })
  .eq("id", req.params.id)
  .eq("user_id", req.userId)
  .select();

  if(error) throw error;

  res.json(data[0]);

 }
 catch(error){

  console.log("UPDATE ERROR:", error);

  res.status(500).json({
   message:error.message
  });

 }

};
/* DELETE */

exports.deleteBudget = async(req,res)=>{

 try{

  const { error } =
  await supabase
  .from("annual_budgets")
  .delete()
  .eq("id",req.params.id)
  .eq("user_id",req.userId);

  if(error) throw error;

  res.status(200).json({
   success:true,
   message:"Budget deleted successfully"
  });

 }
 catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};