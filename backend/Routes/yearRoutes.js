const express = require("express");
const router = express.Router();

const clerkAuth =
require("../middleware/clerkAuth");

const {
 getBudgets,
 getBudgetById,
 createBudget,
 updateBudget,
 deleteBudget
} = require("../Controllers/yearController");

router.get("/", clerkAuth, getBudgets);
router.get("/:id", clerkAuth, getBudgetById);
router.post("/", clerkAuth, createBudget);
router.put("/:id", clerkAuth, updateBudget);
router.delete("/:id", clerkAuth, deleteBudget);

module.exports = router;