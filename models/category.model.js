const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    category_id: {
        type: String,
    },
    category_name: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    created_At: {
        type: Date
    },
    updated_At: {
        type: Date
    }
});
mongoose.model("category", categorySchema);
