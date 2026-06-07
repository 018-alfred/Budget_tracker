const FiveYearBudget =
require("../models/FiveYearBudget");

exports.createBudget =
async (req, res) => {

  try {

    const budget =
    await FiveYearBudget.create({

      user: req.userId,

      ...req.body

    });

    res.status(201).json(budget);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getBudgets =
async (req, res) => {

  try {

    const budgets =
    await FiveYearBudget.find({

      user: req.userId

    });

    res.json(budgets);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getBudgetById =
async (req, res) => {

  try {

    const budget =
    await FiveYearBudget.findOne({

      _id: req.params.id,
      user: req.userId

    });

    if (!budget) {

      return res.status(404).json({
        message: "Budget not found"
      });

    }

    res.json(budget);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.updateBudget =
async (req, res) => {

  try {

    const budget =
    await FiveYearBudget.findOneAndUpdate(

      {
        _id: req.params.id,
        user: req.userId
      },

      req.body,

      {
        new: true
      }

    );

    if (!budget) {

      return res.status(404).json({
        message: "Budget not found"
      });

    }

    res.json(budget);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteBudget =
async (req, res) => {

  try {

    const budget =
    await FiveYearBudget.findOneAndDelete({

      _id: req.params.id,
      user: req.userId

    });

    if (!budget) {

      return res.status(404).json({
        message: "Budget not found"
      });

    }

    res.json({
      message: "Budget deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};