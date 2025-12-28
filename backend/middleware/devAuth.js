/**
 * DEV AUTH: bypass cookies/JWT and force a userId.
 */
module.exports = (req, res, next) => {
  const devUserId = parseInt(process.env.DEV_USER_ID, 10) || 1;
  req.userId = devUserId;
  next();
};
