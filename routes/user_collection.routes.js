const express = require("express");
const router = express.Router();
let userModel = require("../models/user_collection.model");
const ObjectID = require("mongodb").ObjectID;

router.route("/get_current_user_id/:id").get((req, res) => {
  var myobj = {
    id: req.params.id,
  };
  var query = {
    _id: ObjectID.createFromHexString(myobj.id),
  };
  userModel.find(query, (err, result) => {
    if (result) {
      res.json({
        id: result[0]._id,
        user_name: result[0].name,
      });
    } else {
      console.log(err);
    }
  });
});

router.route("/get_current_user/:id").get((req, res) => {
  var myobj = {
    id: req.params.id,
  };
  var query = {
    _id: ObjectID.createFromHexString(myobj.id),
  };
  userModel.findOne(
    query,
    { _id: 0, password: 0, emailConfirmed: 0, emailConfirmCode: 0 },
    (err, result) => {
      if (result) {
        res.json(result);
      } else {
        console.log(err);
      }
    }
  );
});
router.route("/userUpdate/:id").put((req, res) => {
  var myobj = {
    id: req.params.id,
  };
  var query = {
    _id: ObjectID.createFromHexString(myobj.id),
  };
  console.log(query);
  var myobj = {
    avatar: req.body.avatar,
    default_currency: req.body.default_currency,
    mobile: req.body.mobile,
    name: req.body.name,
    nickname: req.body.nickname,
    profession: req.body.profession,
    created_at: req.body.created_at,
    created_by: req.body.created_by,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
  };
  userModel.findByIdAndUpdate(query._id, myobj, (err, result) => {
    if (result) {
      res.json({
        status: "Success",
        statusCode: 200,
        result: "User Updated Successfully",
      });
    } else {
      console.log(err);
    }
  });
});
router.route("/").get((req, res) => {
  res.send("Welcome to User");
});
module.exports = router;
