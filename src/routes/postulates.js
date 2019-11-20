const { Router } = require('express');
const router = Router();
const { getPostulates, getMePostulates, getPostulate } = require('../controllers/postulates.controller');
const verifyToken = require('../controllers/verifyToken');

router.route('/me/postulates/')
    .get(verifyToken, getMePostulates)
router.route('/postulates/')
    .get(verifyToken, getPostulates)
router.route('/postulates/:id')
    .get(verifyToken, getPostulate)

module.exports = router;