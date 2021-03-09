const NaversService = require('../services/NaversService')
require('dotenv').config()

exports.naversList = async(req, res) => {
    const response = await NaversService.naversList(req.query)
    return res.json(response, response.status_code);
}

exports.naverData = async(req, res) => {
    const response = await NaversService.naverData(req.params.id);
    return res.json(response, response.status_code);
}
 

