require("./models/db");
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  employeeController = require("./controllers/employeeController");
userController = require("./controllers/userController");
var corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));
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
app.use("/auth/user", userController);
