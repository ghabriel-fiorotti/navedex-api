const express = require('express');
const router = express.Router();
const NaversController = require('../controller/NaversController');

router.get('/', NaversController.naversList);
router.get('/show/:id', NaversController.naverData);
router.post('/store', NaversController.store);
/* router.put('/update', NaversController.update);
router.delete('/delete', NaversController.delete)  */ 


module.exports = router;