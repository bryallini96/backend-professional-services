const { Router } = require('express');
const router = Router();
const { getRequests, getRequest, createRequest} = require('../controllers/requests.controller');
router.route('/')
    .get(getRequests)
    .post(createRequest)
router.route('/:id')
    .get(getRequest)

module.exports = router;