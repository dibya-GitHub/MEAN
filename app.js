const express = require("express"),
  cors = require("cors"),
  path = require("path"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  config = require("./config"),
  currency = require("./routes/currency_collection.routes"),
  user = require("./routes/user_collection.routes"),
  grouptype = require("./routes/grouptype_collection.routes"),
  groups = require("./routes/group_collection.routes"),
  comments = require("./routes/comment_collection.routes"),
  expenses = require("./routes/expense_collection.routes"),
  authUser = require("./routes/auth");

const corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true,
  methods: "POST, PUT, OPTIONS, DELETE, GET",
  allowedHeaders: "X-Requested-With, Content-Type",
};
mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true },
  function (error, db) {
    if (error) {
      throw new Error("Database failed to connect!");
    } else {
      console.log("MongoDB successfully connected on port 27017.");
    }
    const app = express();
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/currency", currency);
    app.use("/user", user);
    app.use("/group", grouptype);
    app.use("/expense", expenses);
    app.use("/groups", groups);
    app.use("/comments", comments);
    app.use("/api/user", authUser);

    exports.db = db;
    app.listen(config.LISTEN_PORT, function () {
      console.log("Express server listening on port", config.LISTEN_PORT);
    });
  }
);
