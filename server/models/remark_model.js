const mongoose = require('mongoose');

const Remark = mongoose.model('Remark', {
    ean: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        trim: true,
        default: 1
    },
    sid: {
        type: String,
        trim: true,
        require: true
    },
    remark: {
        type: String,
        trim: true
     
    },
    delivery: {
        type: String,
        trim: true,
        default: 'Pending',

    },
    date:{
        type: String,
        trim: true,
    },
    time: {
        type: Number,
        trim: true
    }

    
});




module.exports = { Remark }; 