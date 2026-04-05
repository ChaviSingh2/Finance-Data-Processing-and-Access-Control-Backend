const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

console.log("USER FROM TOKEN:", req.user);

    // Remove "Bearer "
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

