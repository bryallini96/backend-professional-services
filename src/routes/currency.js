const { Router } = require('express');
const router = Router();
const { getExchangeMxnToUsd, getExchangeUsdToMxn } = require('../controllers/currency.controller');
const verifyToken = require('../controllers/verifyToken');

router.route('/exchange/mxn/:quantity/usd')
    .get(verifyToken, getExchangeMxnToUsd)
router.route('/exchange/usd/:quantity/mxn')
    .get(verifyToken, getExchangeUsdToMxn)

module.exports = router;