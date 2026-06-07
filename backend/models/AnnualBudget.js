const mongoose = require("mongoose");

const annualBudgetSchema =
new mongoose.Schema({

 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 year:Number,

 income:Number,

 expense:Number,

 savings:Number

},
{
 timestamps:true
});

module.exports =
mongoose.model(
"AnnualBudget",
annualBudgetSchema
);