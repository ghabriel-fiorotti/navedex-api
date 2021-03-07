const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const NaversRepository = require('../repositories/NaversRepository')
require('dotenv').config()

module.exports = {
    naversList: async (data) => {
        let response;
        try {
            if (Object.keys(data).length === 0) {
                response = await NaversRepository.naversListAll();
            }else {
                response = await NaversRepository.naversListByFilter(data);
            }

            if (response.length === 0){
                return { "message": "Nenhum resultado encontrado", "status_code":200}
            }
            
            return { "message": "Busca realizada com sucesso", "response": response, "status_code":200}

        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    }
}
