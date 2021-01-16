const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Defining collection for business */
let groupCollection = new Schema({
    belongs_to: {
        type: String
    },
    group_name: {
        type: String
    },
    group_type: {
        type: String
    },
    group_name: {
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
    collection: 'group_collection'
});

module.exports = mongoose.model('group_collection', groupCollection);