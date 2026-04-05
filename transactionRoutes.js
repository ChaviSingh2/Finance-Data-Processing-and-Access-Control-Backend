const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// POST → create transaction (Admin only)
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createTransaction
);

// GET → get transactions (Admin + Analyst + Viewer)
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "analyst", "viewer"),
  getTransactions
);

// PUT → update transaction (Admin only)
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateTransaction
);

// DELETE → delete transaction (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteTransaction
);

module.exports = router;