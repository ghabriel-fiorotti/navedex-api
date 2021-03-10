const NaversService = require('../services/NaversService')
require('dotenv').config()

exports.naversList = async (req, res) => {
    const response = await NaversService.naversList(req.query)
    return res.json(response, response.status_code);
}

exports.naverData = async (req, res) => {
    const response = await NaversService.naverData(req.params.id);
    return res.json(response, response.status_code);
}

exports.store = async (req, res) => {
    const response = await NaversService.store(req.body, req.query.id)
    return res.json(response, response.status_code);
}

exports.update = async (req, res) => {
    const response = await NaversService.update(req.body, req.query)
    return res.status(response.status_code).json(response);
}

exports.delete = async (req, res) => {
    const response = await NaversService.delete(req.query);
    return res.status(response.status_code).json(response);
}


