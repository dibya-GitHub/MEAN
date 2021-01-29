const jwt = require("jwt-simple");
const config = require("../config");
const secret = config.DIBYA_SECRET;
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Auth Error" });

  try {
    const decoded = jwt.decode(token, secret, true);
    console.log(decoded);
    req.user = decoded.sub;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Invalid Token" });
  }
};
