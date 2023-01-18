const express = require('express');
let router = express.Router();
const { authenticate, authenticate_order  } = require('../../middleware/auth');

router.route('/tokenpass')
    .get(authenticate, async (req, res) => {
        console.log('token pass');
    })

router.route('/tokenpass/order')
    .get(authenticate_order , async (req, res) => {
        console.log('token pass');
    })

//authenticate_order     

module.exports = router;