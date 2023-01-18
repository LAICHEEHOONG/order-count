const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const jwtSecret = process.env.JWT_SECRET;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    }
})

userSchema.pre('save', function(next) {
    let user = this;
    // console.log(user)
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
            console.log(err, 'user_model.js line 23');
            next();
        }

        bcrypt.hash(user.password, salt,(err, hash) => {
            if(err) {
                console.log(err, 'user_model.js line 28');
                next();
            }

            user.password = hash;
            next();
        })

    })
})

userSchema.method('comparePassword', function(inputPassword, cb) {
    let user = this;
 
    bcrypt.compare(inputPassword, user.password, function(err, result) {
        if(err) {
            console.log(err, 'user_model.js line 45');
            cb(err);
            return;
        }
        cb(null, result);
    })
})

userSchema.method('generateToken', function() {
    let user = this;
   
    let token = jwt.sign(user._id.toString(), jwtSecret);
    // let token = jwt.sign(user.name, jwtSecret);
    return token
})

userSchema.static('verifyToken', function(token, cb) {
    const decoded = jwt.verify(token, jwtSecret);
    cb(decoded)
})

const User = mongoose.model('User', userSchema);

module.exports = { User }; 