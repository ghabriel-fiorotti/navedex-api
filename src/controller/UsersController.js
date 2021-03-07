const db = require('../../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

exports.insert = async(req, res) => {
    const email = req.body.email;
    let user_password = req.body.password;

    user_password = bcrypt.hashSync(user_password, 10);
    try {
        const response = await db('users').insert({email, user_password});
        const token = jwt.sign(response[0], process.env.SECRET,{
            expiresIn : 3000
        });
        return res.json({"message" : "Usuário criado com sucesso", "token": token}, 200)
    } catch (error) {
        const { errno } = error
        if (errno == 1062 ) {
            return res.json({"message" : "Usuário existente no sistema"}, 422)
        }
        return res.json({"message" : "Erro ao realizar cadastro"}, 422)
    }
}


