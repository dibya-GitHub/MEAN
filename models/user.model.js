
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    mobileNumber: {
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
    landMark: {
        type: String
    },
    state: {
        type: String
    },
    addressType: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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