require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Budget Tracker API Running"
  });
});

app.use("/api/monthly", require("./Routes/monthlyRoutes"));
app.use("/api/annual", require("./Routes/annualRoutes"));
app.use("/api/year", require("./Routes/yearRoutes"));
app.use("/api/fiveyear", require("./Routes/fiveYearRoutes"));

module.exports = app;