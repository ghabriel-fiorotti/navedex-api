const express = require('express');
const router = express.Router();
const ProjectsController = require('../controller/ProjectsController');
const {validateToken} = require('../middleware')

router.get('/', validateToken, ProjectsController.projectsList);
router.get('/show/:id', validateToken, ProjectsController.projectsData);
router.post('/store', validateToken, ProjectsController.store);
router.put('/update', validateToken, ProjectsController.update);
router.delete('/delete', validateToken, ProjectsController.delete)

module.exports = router;