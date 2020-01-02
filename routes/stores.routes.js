const express = require('express');
const { getStores, addStore } = require('../controllers/stores.controller')
const router = express.Router();


router.route('/').get(getStores).post(addStore);

module.exports = router;