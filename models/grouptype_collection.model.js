const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Defining collection for business */
let groupTypeCollection = new Schema({
    group_type_id: {
        type: String
    },
    group_type_name: {
        type: String
    }
}, {
    collection: 'group_type_collection'
});

module.exports = mongoose.model('group_type_collection', groupTypeCollection);