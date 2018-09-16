const express = require('express');

const login = require('./login');
const adminHomePage = require('./adminHomePage');
const { authCheck } = require('./middleware');

const router = express.Router();
router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

router.use(authCheck);

router.get('/admin', adminHomePage.get);
router.get('/admin/logout', adminHomePage.logout);
module.exports = router;
