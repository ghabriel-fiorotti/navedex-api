const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/UsersRepository')
require('dotenv').config()

module.exports = {
    loginUser: async(data) =>{
        const { email, password } = data

        try {
            const response = await UsersRepository.getUserByEmail({email});
            const passwordCheck = bcrypt.compareSync(password, response.user_password)

            if(!passwordCheck){
                return {"message":"Senha incorreta", "status_code": 403}
            }
            return {"message": "Login efetuado com sucesso", "token": createJWT(response.id), "status_code": 200}

        } catch (error) {
            console.log(error)
            return {"message":"Erro no banco de dados", "status_code": 422}
        }
    },
    
    registerUser: async (data) => {
        const { email, password } = data

        try {
            const response = await UsersRepository.registerUser({email, user_password: bcrypt.hashSync(password, 10)});
            return {"message" : "Usuário criado com sucesso", "token": createJWT(response[0]), "status_code" : 201}

        } catch (error) {
            console.log(error)
            const { errno } = error

            if (errno == 1062 ) {
                return { "message" : "Usuário existente no sistema", "status_code" : 422}    
            }
                
            return { "message" : "Erro ao realizar cadastro", "status_code" : 422} 
        }
    }
}

function createJWT(id){
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '30m'})
}
