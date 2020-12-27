require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'not authorized' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.message === 'jwt expired') return res.status(409).json({ message: 'you know what to do' });
      return res.status(403).json({ message: 'do not mess with the ZOHAN 🤪' });
    }
    req.user = decoded.payload;
    next();
  });
};
