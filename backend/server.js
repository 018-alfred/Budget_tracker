require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "https://budgettracker-gray.vercel.app",
      "http://localhost:5500",
      "http://127.0.0.1:5500"
    ],
    credentials: true
  })
);

app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Budget Tracker API Running"
  });
});

// Routes
app.use("/api/monthly", require("./Routes/monthlyRoutes"));
app.use("/api/annual", require("./Routes/annualRoutes"));
app.use("/api/year", require("./Routes/yearRoutes"));
app.use("/api/fiveyear", require("./Routes/fiveYearRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});