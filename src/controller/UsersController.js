const db = require('../../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthService = require('../services/AuthService')
require('dotenv').config()

exports.insert = async(req, res) => {
    const response = await AuthService.registerUser(req.body)
    return res.json(response, response.status_code);
}

exports.login = async(req, res) => {
    const response = await AuthService.loginUser(req.body)
    return res.json(response, response.status_code);
}


