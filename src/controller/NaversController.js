const NaversService = require('../services/NaversService')
require('dotenv').config()

exports.naversList = async (req, res) => {
    const response = await NaversService.naversList(req.query)
    return res.status(response.status_code).json(response);
}

exports.naverData = async (req, res) => {
    const response = await NaversService.naverData(req.params.id);
    return res.status(response.status_code).json(response);
}

exports.store = async (req, res) => {
    const response = await NaversService.store(req.body, req.query.idUser)
    return res.status(response.status_code).json(response);
}

exports.update = async (req, res) => {
    const response = await NaversService.update(req.body, req.query)
    return res.status(response.status_code).json(response);
}

exports.delete = async (req, res) => {
    const response = await NaversService.delete(req.query);
    return res.status(response.status_code).json(response);
}


