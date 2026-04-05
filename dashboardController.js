const Transaction = require("../models/Transaction");

//summary api 

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// category breakdown api
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    });

    const breakdown = {};

    transactions.forEach((t) => {
      if (!breakdown[t.category]) {
        breakdown[t.category] = 0;
      }

      breakdown[t.category] += t.amount;
    });

    res.json(breakdown);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//alerts 

exports.getBudgetAlert = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    });

    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "expense") expense += t.amount;
    });

    const budget = 5000; 

    let alert = null;

    if (expense > budget) {
      alert = "Budget exceeded!";
    } else if (expense > budget * 0.8) {
      alert = " budget limit!";
    } else {
      alert = "Within budget";
    }

    res.json({
      totalExpense: expense,
      budget,
      status: alert
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};