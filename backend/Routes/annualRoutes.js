const express = require("express");
const router = express.Router();

const clerkAuth =
require("../middleware/clerkAuth");

const {
 createBudget,
 getBudgets,
 getBudgetById,
 updateBudget,
 deleteBudget
} = require("../controllers/annualController");

router.get("/", clerkAuth, getBudgets);
router.get("/:id", clerkAuth, getBudgetById);
router.post("/", clerkAuth, createBudget);
router.put("/:id", clerkAuth, updateBudget);
router.delete("/:id", clerkAuth, deleteBudget);

module.exports = router;