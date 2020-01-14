const storeModel = require('../models/stores.model');

// @desc gets all stores
// @route v1/stores
// @acess public
exports.getStores = async (req, res, next) => {
    try {
        const stores = await storeModel.find();

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc gets all stores
// @route Post v1/stores
// @acess public
exports.addStore = async (req, res, next) => {
    try {
        const store = await storeModel.create(req.body);
        return res.status(200).json({
            success: true,
            data: store
        })
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).json({ error: err });
        } else {
            res.status(500).json({ error: err });

        }
    }
};