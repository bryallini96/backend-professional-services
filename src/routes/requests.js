const { Router } = require('express');
const router = Router();
const { getRequests, getMeRequests, getRequest, createRequest, updateRequest , postulateInRequest, rejectPostulate, approvePostulate, finishRequest} = require('../controllers/requests.controller');
const verifyToken = require('../controllers/verifyToken');


router.route('/requests/')
    .get(verifyToken, getRequests)
    .post(verifyToken, createRequest)
router.route('/me/requests/')
    .get(verifyToken, getMeRequests)
router.route('/requests/:id')
    .get(verifyToken, getRequest)
    .put(verifyToken, updateRequest)
router.route('/requests/:id/postulate')
    .post(verifyToken, postulateInRequest)
router.route('/requests/:id/finished')
    .put(verifyToken, finishRequest)
router.route('/requests/postulates/:id/rejected')
    .put(verifyToken, rejectPostulate)
router.route('/requests/postulates/:id/approved')
    .put(verifyToken, approvePostulate)

module.exports = router;