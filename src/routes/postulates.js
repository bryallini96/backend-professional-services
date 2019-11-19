const { Router } = require('express');
const router = Router();
const { getPostulates, getPostulate, deletePostulate } = require('../controllers/postulates.controller');
router.route('/')
    .get(getPostulates)
router.route('/:id')
    .get(getPostulate)

module.exports = router;