const express = require('express'),
	cors = require('cors'),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
  currency = require('./routes/currency_collection.routes');
  user = require("./routes/user_collection.routes");
  grouptype = require("./routes/grouptype_collection.routes"),
  expenses = require("./routes/expense_collection.routes");
  groups = require("./routes/group_collection.routes"),
	mongoose.connect("mongodb://localhost:27017/splitbill", {
		useNewUrlParser: true
	}).then(() => {
		console.log("Connected to Database");
	}).catch((err) => {
		console.log("Not Connected to Database ERROR! ", err);
	});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/currency', currency);
app.use("/user", user);
app.use("/group", grouptype);
app.use("/expense", expenses);
app.use("/groups", groups);

const server = app.listen(3000, () => {
	console.log("Server is running on port 3000")
})