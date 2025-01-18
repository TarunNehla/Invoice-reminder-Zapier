const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    email: {
        type : String,
    },
    amount: {
        type: Number,
    },
    dueDate: {
        type: Date,
    },
    recipient: {
        type: String,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);
module.exports = InvoiceModel;
