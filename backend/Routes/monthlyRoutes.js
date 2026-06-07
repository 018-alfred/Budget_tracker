const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/authMiddleware");

const controller =
require("../controllers/monthlyController");

router.get(
 "/",
 auth,
 controller.getBudgets
);

router.post(
 "/",
 auth,
 controller.createBudget
);

router.put(
 "/:id",
 auth,
 controller.updateBudget
);

router.delete(
 "/:id",
 auth,
 controller.deleteBudget
);

module.exports =
router;