const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

router.get("/", (req, res) => {
  res.json("welcome");
});
router.post("/", (req, res) => {
  insertRecord(req, res);
});
router.put("/", (req, res) => {
  updateRecord(req, res);
});
function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) {
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        employee: doc,
      });
    } else {
      res.status(400).json({
        errorMessage: "Missing required parameter",
        status: "BAD_REQUEST",
        statusCode: 400,
      });
    }
  });
}
function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.status(200).json({
          status: "Success",
          statusCode: 200,
          employee: doc,
        });
      } else {
        res.status(400).json({
          errorMessage: "Missing required parameter",
          status: "BAD_REQUEST",
          statusCode: 400,
        });
      }
    }
  );
}
router.get("/list", (req, res) => {
  Employee.find((err, doc) => {
    if (!err) {
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        employeeList: doc,
      });
    } else {
      res.status(400).json({
        errorMessage: "Missing required parameter",
        status: "BAD_REQUEST",
        statusCode: 400,
      });
    }
  });
});
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        employee: doc,
      });
    } else {
      res.json("Error during find record : " + err);
    }
  });
});
router.delete("/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Successfully Deleted",
      });
    } else {
      res.status(400).json({
        errorMessage: "Could not able to find recod",
        status: "BAD_REQUEST",
        statusCode: 400,
      });
    }
  });
});
module.exports = router;
