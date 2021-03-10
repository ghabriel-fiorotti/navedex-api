const ProjectsService = require('../services/ProjectsService')
require('dotenv').config()

exports.projectsList = async (req, res) => {
    const response = await ProjectsService.projectsList(req.query);
    return res.json(response, response.status_code);
}
