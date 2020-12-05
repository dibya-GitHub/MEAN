const url = "mongodb://localhost:27017/EmployeeDB";
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.json("welcome");
});
router.get("/list", (req, res) => {
    mongoose.connect(url, function (err, db) {
        db.collection('category').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({
                status: "Success",
                statusCode: 200,
                countryList: result,
            });
        });
    });
});
router.get("/:id", (req, res) => {
    mongoose.connect(url, (err, db) => {
        db.collection('category').find({ "id": Number(req.params.id) }).toArray((err, result) => {
            if (err) throw err;
            res.json({
                status: "Success",
                statusCode: 200,
                country: result,
            });
        });
    });
});

module.exports = router;