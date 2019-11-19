const { Router } = require('express');
const router = Router();
const { getOpinions, getOpinion, createOpinion } = require('../controllers/opinions.controller');

router.route('/')
    .get(getOpinions)
    .post(createOpinion)
router.route('/:id')
    .get(getOpinion)

module.exports = router;