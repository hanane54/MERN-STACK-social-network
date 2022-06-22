const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  // check if there is no token at all
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    // if there is a token but it is not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
