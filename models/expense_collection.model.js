const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Defining collection for business */
let expenseCollection = new Schema({
    expense_description: {
        type: String
    },
    group_id: {
        type: String
    },
    price: {
        type: String
    },
    currency_code: {
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
    collection: 'expense_collection'
});

module.exports = mongoose.model('expense_collection', expenseCollection);