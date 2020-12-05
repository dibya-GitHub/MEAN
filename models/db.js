const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/EmployeeDB";
mongoose.connect(
  url,
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
require("./country.model");
require("./employee.model");
require("./user.model");
require("./category.model");