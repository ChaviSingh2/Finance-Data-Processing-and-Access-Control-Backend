const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, category, note } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id,
      amount,
      type,
      category,
      note
    });

    res.status(201).json({
      message: "Transaction created",
      transaction
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {
      user: req.user.id
    };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//updateTransaction

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//deleteTransaction

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

