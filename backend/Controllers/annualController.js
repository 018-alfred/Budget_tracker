const AnnualBudget =
require("../models/AnnualBudget");

exports.createBudget =
async (req, res) => {

  try {

    const budget =
    await AnnualBudget.create({

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
    await AnnualBudget.find({

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
    await AnnualBudget.findOne({

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
    await AnnualBudget.findOneAndUpdate(

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
    await AnnualBudget.findOneAndDelete({

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