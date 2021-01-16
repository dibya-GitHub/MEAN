const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Defining collection for business */
let currencyCollection = new Schema({
    currency_code: {
        type: String
    },
    unit: {
        type: String
    }
}, {
    collection: 'currency_collection'
});

module.exports = mongoose.model('currency_collection', currencyCollection);