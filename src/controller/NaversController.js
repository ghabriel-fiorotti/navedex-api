const NaversService = require('../services/NaversService')
require('dotenv').config()

exports.naversList = async(req, res) => {
    console.log(req.query.naver_name);
    const response = await NaversService.naversList(req.query)
    return res.json(response, response.status_code);
}