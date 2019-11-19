const { Router } = require('express');
const router = Router();
const { getOpinions, getOpinion, createOpinion } = require('../controllers/opinions.controller');
const verifyToken = require('../controllers/verifyToken');

router.route('/')
    .get(verifyToken, getOpinions)
    .post(verifyToken, createOpinion)
router.route('/:id')
    .get(verifyToken, getOpinion)

module.exports = router;