require("./models/db");
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  currency = require("./controllers/currency"),
  user = require("./controllers/user");
  groups = require("./controllers/group");


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
app.use("/currency", currency);
app.use("/user", user);
app.use("/groups", groups);

