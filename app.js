const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;

const authMiddleware = require("./src/middleware/authMiddleware");

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

const authorizeRoles = require("./src/middleware/roleMiddleware");

// Only admin can access
app.get(
  "/api/admin-only",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

//transactionRoutes

const transactionRoutes = require("./src/routes/transactionRoutes");

app.use("/api/transactions", transactionRoutes);

//dashboard routes

const dashboardRoutes = require("./src/routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);