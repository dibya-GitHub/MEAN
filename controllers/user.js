const url = "mongodb://localhost:27017/splitbill";
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.json("welcome");
});
router.get("/get_current_user", (req, res) => {
    mongoose.connect(url, function (err, db) {
        db.collection('user_collection').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json(result[0]);
        });
    });
});

module.exports = router;