const { Router } = require('express');
const router = Router();
const { getRequests, getRequest, createRequest, updateRequest , postulateInRequest, rejectPostulate, approvePostulate, finishRequest} = require('../controllers/requests.controller');
const verifyToken = require('../controllers/verifyToken');


router.route('/')
    .get(verifyToken, getRequests)
    .post(verifyToken, createRequest)
router.route('/:id')
    .get(verifyToken, getRequest)
    .put(verifyToken, updateRequest)
router.route('/:id/postulate')
    .post(verifyToken, postulateInRequest)
router.route('/:id/finished')
    .put(verifyToken, finishRequest)
router.route('/postulates/:id/rejected')
    .put(verifyToken, rejectPostulate)
router.route('/postulates/:id/approved')
    .put(verifyToken, approvePostulate)

module.exports = router;