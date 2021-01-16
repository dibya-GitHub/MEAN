const express = require('express');
const router = express.Router();
let expenseModel = require('../models/expense_collection.model');
const ObjectID = require('mongodb').ObjectID;

router.route('/get_expenses').post((req, res) => {
    var myobj = {
        id: req.body.id,
    };
    var query = {
        _id: ObjectID.createFromHexString(myobj.id)
    };
    expenseModel.find({}, (err, result) => {
        if (result) {
            res.json({
                status: "Success",
                statusCode: 200,
                result: result
            });
        } else {
            console.log(err);
        }
    });
});
router.route('/get_expenses/today').post((req, res) => {
    var myobj = {
        id: req.body.id,
    };
    var query = {
        _id: ObjectID.createFromHexString(myobj.id)
    };
    expenseModel.find({}, {
        expense: {
            group_id: query._id
        }
    }, (err, result) => {
        if (result) {
            res.json({
                status: "Success",
                statusCode: 200,
                result: result
            });
        } else {
            console.log(err);
        }
    });
});
router.route('/').get((req, res) => {
    res.send("Welcome to Expense");
});
module.exports = router;