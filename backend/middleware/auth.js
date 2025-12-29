const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const cookieName = process.env.AUTH_COOKIE_NAME || 'careerpath_token';
  const token = req.cookies?.[cookieName];

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid/expired token' });
  }
};
