const express = require('express');
const router = express.Router();
let groupModel = require('../models/group_collection.model');
const ObjectID = require('mongodb').ObjectID;

router.route('/get_group').get((req, res) => {
    groupModel.find((err, result) => {
        if (result) {
            res.json(result);
        } else {
            console.log(err);
        }
    });
});

router.route('/:id').delete((req, res) => {
    var myobj = {
        id: req.params.id,
    };
    var query = {
        _id: ObjectID.createFromHexString(myobj.id)
    };
    groupModel.deleteOne(query,(err, result) => {
        if (result) {
            res.json({
                status: "Success",
                statusCode: 200,
                statusText: "Deleted Successfully"
            });
        } else {
            console.log(err);
        }
    });
});
router.route('/get_groupby_id').post((req, res) => {
    var myobj = {
        id: req.body.id,
    };
    var query = {
        _id: ObjectID.createFromHexString(myobj.id)
    };
    groupModel.findOne(query,(err, result) => {
        if (result) {
            res.json(result);
        } else {
            console.log(err);
        }
    });
});

router.route('/create_group').post((req, res) => {
    var myobj = {
        belongs_to: req.body.belongs_to,
        created_at: new Date(),
        created_by: req.body.created_by,
        group_name: req.body.group_name,
        group_type: req.body.group_type,
        updated_at: req.body.updated_at,
        updated_by: req.body.updated_by
    };
    groupModel.insertMany(myobj,(err, result) => {
        if (result) {
            res.json({
                status: "Success",
                statusCode: 200,
                statusText: "Group Created Sucessfully"
            });
        } else {
            console.log(err);
        }
    });
});

router.route('/edit_group').put((req, res) => {
    var myobj = {
        group_id:req.body.group_id,
        belongs_to: req.body.belongs_to,
        group_name: req.body.group_name,
        group_type: req.body.group_type,
        updated_at: req.body.updated_at,
        updated_by: req.body.updated_by
    };
    groupModel.findByIdAndUpdate(req.body.group_id,myobj,(err, result) => {
        if (result) {
            res.json({
                status: "Success",
                statusCode: 200,
                statusText: "Group Updated Sucessfully"
            });
        } else {
            console.log(err);
        }
    });
});

router.route('/').get((req, res) => {
    res.send("Welcome to Group");
});
module.exports = router;





