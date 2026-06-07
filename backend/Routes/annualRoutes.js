const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
} = require("../controllers/annualController");

router.get("/", authMiddleware, getBudgets);

router.get("/:id", authMiddleware, getBudgetById);

router.post("/", authMiddleware, createBudget);

router.put("/:id", authMiddleware, updateBudget);

router.delete("/:id", authMiddleware, deleteBudget);

module.exports = router;