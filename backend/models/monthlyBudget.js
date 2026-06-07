const mongoose = require("mongoose");

const monthlyBudgetSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  month:String,

  year:Number,

  income:Number,

  expense:Number,

  savings:Number
},
{
 timestamps:true
}
);

module.exports =
mongoose.model(
"MonthlyBudget",
monthlyBudgetSchema
);