
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pinCode: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    mobileNo: {
        type: String
    },
    addType: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);