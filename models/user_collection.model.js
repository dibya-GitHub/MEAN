const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Defining collection for business */
let userCollection = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    emailConfirmed: {
      type: String,
    },
    emailConfirmCode: {
      type: String,
    },
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    default_currency: {
      type: String,
    },
    avatar: {
      type: String,
    },
    profession: {
      type: String,
    },
    created_at: {
      type: Date,
      default: new Date(),
    },
    created_by: {
      type: String,
    },
    updated_at: {
      type: Date,
      default: new Date(),
    },
    updated_by: {
      type: String,
    },
  },
  {
    collection: "user_collection",
  }
);

module.exports = mongoose.model("user_collection", userCollection);
