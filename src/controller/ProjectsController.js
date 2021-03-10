const ProjectsService = require('../services/ProjectsService')
require('dotenv').config()

exports.projectsList = async (req, res) => {
    const response = await ProjectsService.projectsList(req.query);
    return res.json(response, response.status_code);
}

exports.projectsData = async (req, res) => {
    const response = await ProjectsService.projectsData(req.params.id)
    return res.json(response, response.status_code);
}

exports.store = async(req, res) => {
    const response = await ProjectsService.store(req.body, req.query)
    console.log(req.query)
    return res.json(response, response.status_code);
}

exports.update = async(req, res) => {
    const response = await ProjectsService.update(req.body, req.query)
    return res.status(response.status_code).json(response);
}

exports.delete = async(req, res) => {
    const response = await ProjectsService.delete(req.query);
    return res.status(response.status_code).json(response);
}


