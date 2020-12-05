const url = "mongodb://localhost:27017/EmployeeDB";
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    res.json("welcome");
});
router.get("/list", (req, res) => {
    mongoose.connect(url, function (err, db) {
        db.collection('os_country').find({}).toArray(function (err, result) {
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
        db.collection('os_country').find({ "country_id": Number(req.params.id) }).toArray((err, result) => {
            if (err) throw err;
            res.json({
                status: "Success",
                statusCode: 200,
                country: result,
            });
        });
    });
});
router.get("/:country_id/state/", (req, res) => {
    mongoose.connect(url, (err, db) => {
        db.collection('oc_zone').find({ "country_id": Number(req.params.country_id) }).toArray((err, result) => {
            if (err) throw err;
            res.json({
                status: "Success",
                statusCode: 200,
                stateList: result,
            });
        });
    });
});
module.exports = router;