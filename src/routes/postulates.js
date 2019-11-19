const { Router } = require('express');
const router = Router();
const { getPostulates, getPostulate, deletePostulate } = require('../controllers/postulates.controller');
const verifyToken = require('../controllers/verifyToken');

router.route('/')
    .get(verifyToken, getPostulates)
router.route('/:id')
    .get(verifyToken, getPostulate)

module.exports = router;