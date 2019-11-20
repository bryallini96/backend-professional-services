const { Router } = require('express');
const router = Router();
const { getOpinions, getMeOpinions, getOpinion, createOpinion } = require('../controllers/opinions.controller');
const verifyToken = require('../controllers/verifyToken');

router.route('/me/opinions')
    .get(verifyToken, getMeOpinions)
router.route('/opinions/')
    .get(verifyToken, getOpinions)
    .post(verifyToken, createOpinion)
router.route('/opinions/:id')
    .get(verifyToken, getOpinion)

module.exports = router;