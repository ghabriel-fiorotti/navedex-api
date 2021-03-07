const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');



router.post('/create', UsersController.insert);



module.exports = router;