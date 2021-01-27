const express = require("express");
const router = express.Router();
// let groupTypeModel = require("../models/user_collection.model");

router.route("/").get((req, res) => {
  res.send("Welcome to auth");
});
module.exports = router;
