const express = require('express');
const login = require('./login');


const router = express.Router();
router.get('/admin/login', login.get);
router.post('/admin/login', login.post);


module.exports = router;