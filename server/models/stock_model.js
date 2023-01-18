const mongoose = require('mongoose');

const Stock = mongoose.model('Stock', {
    ean: {
        type: String,
        trim: true
    },
    onHand: Number,
    found: Number,
    tableColor: String
});

module.exports = { Stock };