const { Router } = require('express');
const router = Router();
const { getRequests, getRequest, createRequest, updateRequest , postulateInRequest, rejectPostulate, approvePostulate, finishRequest} = require('../controllers/requests.controller');
router.route('/')
    .get(getRequests)
    .post(createRequest)
router.route('/:id')
    .get(getRequest)
    .put(updateRequest)
router.route('/:id/postulate')
    .post(postulateInRequest)
router.route('/:id/finished')
    .put(finishRequest)
router.route('/postulates/:id/rejected')
    .put(rejectPostulate)
router.route('/postulates/:id/approved')
    .put(approvePostulate)
module.exports = router;