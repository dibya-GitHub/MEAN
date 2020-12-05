const mongoose = require("mongoose");

var countrySchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    code: {
        type: String,
    },
    value: {
        type: String,
    },
    description: {
        type: String,
    },
    masterCode: {
        type: String,
    }
});
mongoose.model("Country", countrySchema);
