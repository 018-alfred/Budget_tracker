require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
 res.json({
  success:true,
  message:"Budget Tracker API Running"
 });
});

app.use("/monthly", require("./Routes/monthlyRoutes"));
app.use("/annual", require("./Routes/annualRoutes"));
app.use("/year", require("./Routes/yearRoutes"));
app.use("/fiveyear", require("./Routes/fiveYearRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
 console.log(`Server running on ${PORT}`);
});