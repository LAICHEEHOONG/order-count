const express = require('express');
let router = express.Router();

const { Stock } = require('../../models/stock_model');
const {Remark} = require('../../models/remark_model');
const {History} = require('../../models/history_model');

router.route('/input')
.post(async (req, res) => {
    //'/api/update'
    try {
        if (!Number(req.body.ean) || req.body.ean.length < 11) {
            res.json({
                status: 'error', remarkContent: {
                    eanCode: req.body.ean,
                    infoEan: 'Err...'
                }
            })
            return;
        }

        const findEan = await Stock.find({ ean: req.body.ean });
        const remarkEAN = await Remark.find({ ean: req.body.ean });
        
        const remarkInfo = () => {
            let info = [];
            remarkEAN.forEach(obj => {
                let newObj = {
                    sid: obj.sid,
                    quantity: obj.quantity
                }
                info.push(newObj)
            })

            let infoString = [];

            info.forEach(obj => {
                infoString.push(` PCD${obj.sid} *${obj.quantity} `);
            })

            return infoString.toString();
            // return info;
        }

        console.log(remarkInfo())

        if (remarkEAN.length === 0) {
            if (findEan.length === 0) {
                const item = new Stock({
                    ean: req.body.ean,
                    onHand: req.body.onHandQty,
                    found: 0,
                    tableColor: 'table-success'
                })
                const saveData = await item.save();
                // res.status(200).json({status: 'saved', remarkContent: `${req.body.ean} Saved`});
                res.status(200).json({ status: 'saved', remarkContent: { eanCode: req.body.ean, infoEan: 'Saved' } });
            } else {
                const beforeQty = Number(findEan[0].onHand);
                const afterQty = beforeQty + Number(req.body.onHandQty);
                const foundQty = findEan[0].found;
                const color = () => {
                    if (foundQty > afterQty) {
                        return 'table-danger'
                    } else if (foundQty === afterQty) {
                        return ''
                    } else {
                        return 'table-success'
                    }
                }
                const updateQty = await Stock.updateOne({ ean: req.body.ean }, { $set: { onHand: afterQty, tableColor: color() } });

                // res.status(200).json({status: 'updated', remarkContent: `${findEan[0].ean} Found: ${findEan[0].onHand}`});
                // res.status(200).json({status: 'updated', remarkContent: {eanCode: findEan[0].ean, infoEan: `Found: ${findEan[0].onHand}`}});
                res.status(200).json({ status: 'updated', remarkContent: { eanCode: findEan[0].ean, infoEan: `Found: ${afterQty}` } });

            }
        } else {
            if (findEan.length === 0) {
                const item = new Stock({
                    ean: req.body.ean,
                    onHand: req.body.onHandQty,
                    found: 0,
                    tableColor: 'table-success'
                })
                const saveData = await item.save();
                // res.status(200).json({status: 'tuturu', remarkContent: `${remarkEAN[0].content}, ${req.body.ean} Saved`});
                res.status(200).json({
                    status: 'tuturu', remarkContent: {
                        eanCode: req.body.ean,
                        infoEan: remarkInfo()
                    }
                });

            } else {
                const beforeQty = Number(findEan[0].onHand);
                const afterQty = beforeQty + Number(req.body.onHandQty);
                const foundQty = findEan[0].found;
                const color = () => {
                    if (foundQty > afterQty) {
                        return 'table-danger'
                    } else if (foundQty === afterQty) {
                        return ''
                    } else {
                        return 'table-success'
                    }
                }
                const updateQty = await Stock.updateOne({ ean: req.body.ean }, { $set: { onHand: afterQty, tableColor: color() } });

                // res.status(200).json({status: 'tuturu', remarkContent: `${remarkEAN[0].content} ${findEan[0].ean} Found: ${findEan[0].onHand}`})
                res.status(200).json({
                    status: 'tuturu', remarkContent: {
                        eanCode: findEan[0].ean,
                        infoEan: remarkInfo()
                        
                    }
                })

            }
        }

    } catch (err) {
        // console.log(err);
        res.json({ error: 'err' });
    }
})

///api/stock
router.route('/list')
.get(async (req, res) => {
    //'/api/list'
    try {
        const allData = await Stock.find();
        // console.log(allData);
        res.status(200).json(allData);

    } catch (err) {
        // console.log(err);
        res.status(400).json({ error: err })
    }
})
.patch(async (req, res) => {
    //'/api/update/found'
    try {
        let eanCode = req.body.ean;
        let foundCode = req.body.foundQty;

        if (foundCode === '') {
            foundCode = 0;
        }
        const findFoundQty = await Stock.find({ ean: eanCode });

        const onHand = findFoundQty[0].onHand;
        const newFoundTotal = findFoundQty[0].found + foundCode;

        if (onHand > newFoundTotal) {
            await Stock.updateOne({ ean: eanCode }, { $set: { found: newFoundTotal, tableColor: 'table-success' } });
        } else if (onHand < newFoundTotal) {
            await Stock.updateOne({ ean: eanCode }, { $set: { found: newFoundTotal, tableColor: 'table-danger' } });
        } else {
            await Stock.updateOne({ ean: eanCode }, { $set: { found: newFoundTotal, tableColor: '' } });
        }

        // const updateFoundQty = await Stock.updateOne({ ean: eanCode }, { $set: { found: newFoundTotal } });
        res.json({
            status: 'Updated found quantity',
            foundQuantity: newFoundTotal
        })

    } catch (err) {
        console.log(err);
        res.json({
            status: 'update found quantity failed',
            error: err
        })
    }
})
.delete(async (req, res) => {
    //'/api/remove'
    try {
        
        let ean = req.body.ean;
        const remove = await Stock.deleteOne({ ean });
        res.json({ status: `Remove Stock Ean: ${ean}` });
    } catch (err) {
        // console.log(err);
        res.json({ status: 'Delete Failed', error: err })
    }

})
.post(async (req, res) => {
    ///'api/save'
    try {
        const dateClient = req.body.date;
        const newData = await Stock.find();

        await History.create({ data: newData, date: dateClient, time: new Date().getTime() });

        const remove = Stock.collection.drop();

        res.json({ status: 'saved' })

    } catch (err) {
        // console.log(err);
        res.json({ status: 'Save to history failed', error: err });
    }

})

router.route('/list/check')
.get(async (req, res) => {
    // '/api/exist'
    try {
        const stock = await Stock.find();
        res.json({ dataLength: stock.length })

    } catch (err) {
        let status = {
            information: 'Check list exist failed',
            error: err
        }
        // console.log(status);
        res.json(status);
    }
})

module.exports = router;