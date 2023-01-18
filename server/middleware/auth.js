const { User } = require('../models/user_model');



const authenticate = async (req, res, next) => {
    try {
        let token = req.cookies.auth;
        await User.verifyToken(token, (decode) => {

            res.json({ message: 'token pass' })

            next();
        })



    } catch (err) {
        console.log({ error: err, location: 'authenticate catch error' });
        res.json({
            error: err,
            location: 'authenticate catch error',
            message: 'authenticate failed'
        });

    }
}

const authenticate_order = async (req, res, next) => {
    try {
        let token_user = req.cookies.auth_user;
        let token = req.cookies.auth;

        if (token) {
            await User.verifyToken(token, (decode) => {

                res.json({ message: 'token pass', role: 'admin' })

                next();
            })
        } else if(token_user) {
            await User.verifyToken(token_user, (decode) => {

                res.json({ message: 'token pass', role: 'user' })

                next();
            })
        } else {
            res.json({
                location: 'authenticate catch error',
                message: 'authenticate failed'
            });
        }

        // if (token_user) {
        //     await User.verifyToken(token_user, (decode) => {

        //         res.json({ message: 'token pass', role: 'user' })

        //         next();
        //     })
        // }





    } catch (err) {
        console.log({ error: err, location: 'authenticate catch error' });
        res.json({
            error: err,
            location: 'authenticate catch error',
            message: 'authenticate failed'
        });

    }
}

module.exports = { authenticate, authenticate_order };

//eyJhbGciOiJIUzI1NiJ9.NjFjMTBlMjIyNDgyYWUxMTE3NzFlNDU2.uhlOItr5JD0OMxdLPBFUHDI4lCq85TkZUjX8JFST5io