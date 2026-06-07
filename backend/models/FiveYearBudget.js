const mongoose = require("mongoose");

const fiveYearSchema =
new mongoose.Schema({

 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 startYear:Number,

 endYear:Number,

 income:Number,

 expense:Number,

 savings:Number

},
{
 timestamps:true
});

module.exports =
mongoose.model(
"FiveYearBudget",
fiveYearSchema
);