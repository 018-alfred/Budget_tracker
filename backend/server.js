require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

connectDB();

const app =
express();

app.use(cors());

app.use(express.json());

app.use(
 "/api/auth",
 require("./routes/authRoutes")
);

app.use(
 "/api/monthly",
 require("./routes/monthlyRoutes")
);

app.get("/",(req,res)=>{

 res.send(
 "Budget Tracker API Running"
 );

});

app.listen(
 process.env.PORT,
 ()=>{

 console.log(
  `Server Running On ${process.env.PORT}`
 );

});