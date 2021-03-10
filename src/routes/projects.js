const express = require('express');
const router = express.Router();
const ProjectsController = require('../controller/ProjectsController');

router.get('/', ProjectsController.projectsList);
router.get('/show/:id', ProjectsController.projectsData);
router.post('/store', ProjectsController.store);
router.put('/update', ProjectsController.update);
router.delete('/delete', ProjectsController.delete) 

module.exports = router;