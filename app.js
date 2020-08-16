require("./models/db");
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  employeeController = require("./controllers/employeeController");
userController = require("./controllers/userController");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});
app.set("port", process.env.PORT || 3000);
// Start the service
app.listen(app.get("port"));
console.log(
  "Sample node server Started @ " +
    new Date() +
    " Running on port no: " +
    app.get("port")
);
app.get("/", (req, res) => {
  res.send("Welcome to Dibya's App");
});
app.use("/employee", employeeController);
app.use("/user", userController);
