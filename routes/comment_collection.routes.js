const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
let commentModel = require("../models/comment_collection.model");
router.route("/create_comment").post((req, res) => {
  var myobj = {
    expense_id: req.body.expense_id,
    comment: req.body.comment,
    created_at: new Date(),
    created_by: req.body.created_by,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
  };
  commentModel.insertMany(myobj, (err, result) => {
    if (result) {
      res.json({
        status: "Success",
        statusCode: 200,
        result: "Comment Added Successfully",
      });
    } else {
      console.log(err);
    }
  });
});
router.route("/:id").delete((req, res) => {
  var myobj = {
    id: req.params.id,
  };
  var query = {
    _id: ObjectID.createFromHexString(myobj.id),
  };
  commentModel.deleteOne(query, (err, result) => {
    if (result) {
      res.json({
        status: "Success",
        statusCode: 200,
        statusText: "Deleted Successfully",
      });
    } else {
      console.log(err);
    }
  });
});
router.route("/get_all_comments/:id").get((req, res) => {
  var myobj = {
    id: req.params.id,
  };
  commentModel.find(
    {
      expense_id: myobj.id,
    },
    {
      comment: "",
    },
    (err, result) => {
      if (result) {
        res.json({
          status: "Success",
          statusCode: 200,
          result: result,
        });
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = router;
