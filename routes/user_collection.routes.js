const express = require('express');
const router = express.Router();
let userModel = require('../models/user_collection.model');
router.route('/get_current_user_id').get((req, res) => {
    userModel.find((err, result) => {
        if (result) {
            res.json({
                "id": result[0]._id,
                "user_name": result[0].name,
            });
        } else {
            console.log(err);
        }
    });
});

router.route('/get_current_user').get((req, res) => {
    userModel.findOne((err, result) => {
        if (result) {
            res.json(result);
        } else {
            console.log(err);
        }
    });
});


router.route('/').get((req, res) => {
    res.send("Welcome to User");
});
module.exports = router;