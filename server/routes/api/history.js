const express = require('express');
let router = express.Router();

const { History } = require('../../models/history_model');

router.route('/historys')
    .get(async (req, res) => {
        //'/api/history', 
        try {
            // const historyData = await History.find();
            const historyData = await History.find().sort({ time: -1 });

            res.json(historyData);
        } catch (err) {
            res.json({ status: 'get history failed', error: err });
        }
    })
    .delete(async (req, res) => {
        // '/api/deleteHistory'
        try {
            let id = req.body.id;
            const remove = await History.deleteOne({ _id: id });
            res.json({ status: `Remove History ID: ${id}` });

        } catch (err) {
            const status = {
                information: 'delete history failed',
                error: err
            }
            // console.log(status);
            res.json(status);
        }
    })

router.route('/historys/child')
    .post(async (req, res) => {
        // '/api/showOneHistory'
        try {
            let ID = req.body.id;
            // console.log(ID)
            const findHistory = await History.findById(ID)
            // console.log(findHistory.data);
            res.json(findHistory.data);

        } catch (err) {
            let status = {
                information: 'show history failed',
                error: err
            }
            // console.log(status);
            res.json(status);
        }
    })

module.exports = router;