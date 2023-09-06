const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and extract user information
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
console.log(token,"fasdfsdfdsf")
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Extract user information, including the role, from the decoded token
    req.user = decodedToken;
    next();
  });
};
