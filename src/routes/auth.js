const { Router } = require('express');
const router = Router();
const { signup, me, signin, logout, getUsers } = require('../controllers/auth.controller');
const verifyToken = require('../controllers/verifyToken');

router.route('/signup')
    .post(signup)
router.route('/me')
    .get(verifyToken, me)
router.route('/signin')
    .post(signin)
router.route('/logout')
    .get(logout)
router.route('/users')
    .get(getUsers)

module.exports = router;