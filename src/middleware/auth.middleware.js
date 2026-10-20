const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and protect routes
const verifyToken = (req, res, next) => {
  // Get authorization header from the request
  const authHeader = req.headers['authorization'];
  
  // Extract token from 'Bearer <token>' format
  const token = authHeader && authHeader.split(' ')[1];

  // If token is missing, deny access
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key');
    
    // Attach admin info to request object for downstream use
    req.admin = verified;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;