const express = require('express');
const { getStores } = require('../controllers/stores.controller')
const router = express.Router();


router.route('/').get(getStores);

module.exports = router;