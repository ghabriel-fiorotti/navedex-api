const express = require('express');
const router = express.Router();
const NaversController = require('../controller/NaversController');

router.get('/', NaversController.naversList);
router.get('/show/:id', NaversController.naverData);

module.exports = router;