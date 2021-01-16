const express = require('express');
const router = express.Router();
let currencyModel = require('../models/currency_collection.model');
router.route('/list').get((req, res) => {
    currencyModel.find((err, result) => {
        if (result) {
            res.json({
                status: "Success",
                statusCode: 200,
                currency: result
            });
        } else {
            console.log(err);
        }
    });
});
router.route('/').get((req, res) => {
    res.send("Welcome to Currency");
});
module.exports = router;