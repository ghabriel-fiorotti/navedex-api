const express = require('express');
const router = express.Router();
const NaversController = require('../controller/NaversController');
const {validateToken} = require('../middleware')

router.get('/', validateToken, NaversController.naversList);
router.get('/show/:id', validateToken, NaversController.naverData);
router.post('/store', validateToken, NaversController.store);
router.put('/update', validateToken, NaversController.update);
router.delete('/delete', validateToken, NaversController.delete)


module.exports = router;