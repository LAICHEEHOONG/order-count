const mongoose = require('mongoose');

const History = mongoose.model('History', {
    data: Object,
    date: String,
    time: Number
});

module.exports = { History };