const supabase =
require("../Config/supabase");

/* GET ALL */

exports.getBudgets = async (req,res)=>{

 try{

  const { data,error } =
  await supabase
  .from("monthly_budgets")
.select("*")
.eq("user_id", req.userId)
.order("created_at",{
 ascending:false
});

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
  .from("monthly_budgets")
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

exports.createBudget = async (req, res) => {

 try {

  console.log("USER ID:", req.userId);
  console.log("BODY:", req.body);

  const {
   month,
   year,
   totalIncome,
   totalExpense,
   savings
  } = req.body;

  const { data, error } =
  await supabase
   .from("monthly_budgets")
   .insert([
    {
     user_id: req.userId,
     month,
     year,
     total_income: totalIncome,
     total_expense: totalExpense,
     savings
    }
   ])
   .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
   return res.status(500).json(error);
  }

  res.status(201).json(data[0]);

 } catch (error) {

  console.error("CATCH ERROR:", error);

  res.status(500).json({
   message: error.message
  });

 }

};
/* UPDATE */

exports.updateBudget = async(req,res)=>{

 try{

  const {
   month,
   year,
   totalIncome,
   totalExpense,
   savings
  } = req.body;

  const { data,error } =
  await supabase
  .from("monthly_budgets")
  .update({
   month,
   year,
   total_income: totalIncome,
   total_expense: totalExpense,
   savings
  })
  .eq("id",req.params.id)
.eq("user_id",req.userId)
.select();

  if(error) throw error;

  res.json(data[0]);

 }
 catch(error){

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
  .from("monthly_budgets")
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