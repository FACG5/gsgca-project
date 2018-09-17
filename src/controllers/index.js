const express = require('express');

const login = require('./login');
const error = require('./error');
const adminHomePage = require('./adminHomePage');
const { authCheck } = require('./middleware');

const router = express.Router();

router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

router.get('/admin', authCheck, adminHomePage.get);
router.get('/admin/logout', authCheck, adminHomePage.logout);

router.use(error.client);
router.use(error.server);

module.exports = router;
