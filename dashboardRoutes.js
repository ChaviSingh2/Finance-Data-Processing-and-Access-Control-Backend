const express = require("express");
const router = express.Router();

const {
  getSummary,
  getCategoryBreakdown
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Summary
router.get(
  "/summary",
  authMiddleware,
  authorizeRoles("admin", "analyst"),
  getSummary
);

// Category breakdown
router.get("/categories", authMiddleware, getCategoryBreakdown);

module.exports = router;

//alerts 

const { getBudgetAlert } = require("../controllers/dashboardController");

router.get("/budget", authMiddleware, getBudgetAlert);