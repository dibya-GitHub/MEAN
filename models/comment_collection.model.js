const mongoose = require('mongoose');
const Schema = mongoose.Schema; /* Defining collection for business */
let commentCollection = new Schema({
    expense_id: {
        type: String
    },
    comment: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    created_by: {
        type: String
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },
    updated_by: {
        type: String
    }
}, {
    collection: 'comment_collection'
});
module.exports = mongoose.model('comment_collection', commentCollection);