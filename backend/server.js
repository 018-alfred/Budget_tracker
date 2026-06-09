require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const app =
express();

app.use(cors());

app.use(express.json());

app.use(
 "/api/monthly",
 require("./routes/monthlyRoutes")
);

app.use(
 "/api/annual",
 require("./routes/annualRoutes")
);

app.use(
 "/api/year",
 require("./routes/yearRoutes")
);

app.use(
 "/api/fiveyear",
 require("./routes/fiveYearRoutes")
);

app.listen(
 5000,
 ()=>{
  console.log(
   "Server Running"
  );
 }
);