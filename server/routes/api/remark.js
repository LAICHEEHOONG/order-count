const express = require('express');
let router = express.Router();

const { Remark } = require('../../models/remark_model');
 /****************** Remark **************************/
 router.route('/remarks')
    .post(async (req, res) => {
        // '/api/remark'
        const ean = req.body.ean;
        const content = req.body.content;
        let quantity = req.body.quantity;
        const sid = req.body.sid;
        const remark = req.body.remark;
        const date = req.body.date;
        const time = req.body.time;
        


        // const contentRemark = req.body.remark;

        try {

            if(quantity === '') {
                const newRemark = new Remark({
                    ean,
                    content,
                    sid,
                    remark,
                    date,
                    time
                })
                await newRemark.save();
            } else {
                const newRemark = new Remark({
                    ean,
                    content,
                    quantity,
                    sid,
                    remark,
                    date,
                    time
                })
                await newRemark.save();
            }

     

            

            const status = {
                information: 'Remark data upload success'
            }

            res.json(status);


        } catch (err) {
            // const status = {
            //     error: err,
            //     information: 'Upload remark failed'
            // }
            console.log(err)
            res.json(err);
        }
    })
    .get(async (req, res) => {
        // '/api/remark'
        try {
            const remarkData = await Remark.find().sort({ time: -1 });;
            res.json(remarkData);

        } catch (err) {
            const status = {
                information: 'Find remark data failed',
                error: err
            }

            res.json(status);
        }
    })
    .delete(async (req, res) => {
        // '/api/remark/delete', 
        const id = req.body.ID;

        try {
            const removeRemark = await Remark.findByIdAndRemove(id);

            res.json('Remark data remove');

        } catch (err) {
            console.log(err);
            res.json(err);
        }
    })
  
router.route('/order')
    .post(async(req, res) => {
        try {
            let id = req.body.id;
            const orderData = await Remark.findById(id);
            console.log(orderData);
            res.json({data: orderData});

        } catch(err) {
            console.log(err);
            res.send(err);
        }
     
    })
    .patch(async(req, res) => {
        try {
            let id = req.body.id;
            let ean = req.body.ean;
            let content = req.body.product;
            let quantity = req.body.quantity;
            let sid = req.body.sid;
            let remark = req.body.remark;
            let delivery = req.body.delivery;
            // await Stock.updateOne({ ean: eanCode }, { $set: { found: newFoundTotal, tableColor: 'table-success' } });
            await Remark.updateOne({_id: id}, {$set: {ean, content, quantity, sid, remark, delivery}})

            res.send('edit update')
        } catch(err) {
            console.log(err);
            res.send(err)
        }
    })    

module.exports = router;