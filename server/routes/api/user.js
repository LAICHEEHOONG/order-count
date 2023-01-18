const express = require('express');
let router = express.Router();
const { User } = require('../../models/user_model');
const { authenticate } = require('../../middleware/auth');
///api/remark
router.route('/auth/register')
    .post(async (req, res) => {
        //register
        try {
            const accountName = req.body.name;
            let accountPassword = req.body.password;
            let accountRole = req.body.role;

            const newUser = new User({
                name: accountName,
                password: accountPassword,
                role: accountRole
            })


            await newUser.save();

            console.log('user register');
            res.json({
                status: 'user register',
                message: 'register'
            })


        } catch (err) {
            console.log('error user.js line 40', err);
            res.json({
                error: err,
                mark: 'deprecated account'
            })

        }


    })



router.route('/auth/login')
    .post(async (req, res) => {
        const accountName = req.body.userName;
        const accountPassword = req.body.password;

        try {
            const currentUser = await User.findOne({ name: accountName });
            console.log(currentUser.role)

            if (!currentUser) {
                console.log('account does not exist');
                res.json({ message: 'account does not exist' });
            }

            currentUser.comparePassword(accountPassword, function (err, result) {
                if (err) {
                    console.log({ line: 'user.js 61', error: err });
                    res.json({ line: 'user.js 62', error: err });
                }
                if (result) {
                    let token = currentUser.generateToken();

                    if(currentUser.role === 'user') {
                        res.cookie('auth_user', token).json({ message: 'login_user', token: token });
                    } else {
                        res.cookie('auth', token).json({ message: 'login', token: token });
                    }
             
                    // res.cookie('auth', token).json({ message: 'login', token: token });
                } else {
                    // console.log('wrong password');
                    res.json({ message: 'wrong password' });
                }
            })

            // console.log('user account available');
            // res.json({ status: 'user account available' });


        } catch (err) {
            console.log('user.js catch err /signin', err);
            res.json({ errFn: 'user.js catch err /signin', error: err });
        }


    })

router.route('/auth/logintesting')
    .post(async (req, res) => {
        const accountName = req.body.userName;
        const accountPassword = req.body.password;

        try {
            const currentUser = await User.findOne({ name: accountName });

            if (!currentUser) {
                console.log('account does not exist');
                res.json({ message: 'account does not exist' });
            }

            // let token = currentUser.generateToken();

            currentUser.comparePassword(accountPassword, function (err, result) {

                if (result) {
                    let token = currentUser.generateToken();
                    console.log(token);
                    console.log('user login');
                    res.cookie('auth', token).json({ message: 'login', token: token });

                } else {
                    console.log('wrong password');
                    res.json({ message: 'wrong password' });
                }


                if (err) {
                    console.log({ line: 'user.js 61', error: err });
                    res.json({ line: 'user.js 62', error: err });
                }





            })




        } catch (err) {
            console.log('user.js catch err /signin', err);
            res.json({ errFn: 'user.js catch err /signin', error: err });
        }


    })

router.route('/auth/logout')
    .get((req, res) => {
        res.json({ message: 'logout' });
    })

// router.route('/verifytoken')
//     .get(authenticate , async(req,res) => {
//         console.log('verifytoken');
//         res.send('verifytoken');
//     })


module.exports = router;