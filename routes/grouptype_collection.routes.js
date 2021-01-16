const express = require('express');
const router = express.Router();
let groupTypeModel = require('../models/grouptype_collection.model');
router.route('/get_group_type').get((req, res) => {
    groupTypeModel.find((err, result) => {
        if (result) {
            res.json(result);
        } else {
            console.log(err);
        }
    });
});
router.route('/').get((req, res) => {
    res.send("Welcome to groupType");
});
module.exports = router;