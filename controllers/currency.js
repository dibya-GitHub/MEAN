const url = "mongodb://localhost:27017/splitbill";
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.json("welcome");
});
router.get("/list", (req, res) => {
    mongoose.connect(url, function (err, db) {
        db.collection('currency_collection').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({
                status: "Success",
                statusCode: 200,
                currency: result,
            });
        });
    });
});

module.exports = router;