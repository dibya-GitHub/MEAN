const jwt = require("jwt-simple");
const config = require("../config");
const secret = config.DIBYA_SECRET;
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.decode(token, secret, true);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
