const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const NaversRepository = require('../repositories/NaversRepository')
require('dotenv').config()

module.exports = {
    naversList: async (data) => {
        //Acabar depois
        let response;
        /*let currentDate = new Date();
        
        const admissionYear = parseInt(currentDate.getFullYear()) - data.companyTime;
        const currentMonth = (currentDate.getMonth()+1).toString();
        const currentDay = currentDate.getDate().toString();
        yearAdmission = admissionYear.toString().concat('-',currentMonth,'-',currentDay); */
        
        try {
            if (Object.keys(data).length === 0) {
                response = await NaversRepository.naversListAll();
            } else {
                console.log(data.getFullYear)
                response = await NaversRepository.naversListByFilter(data);
            }

            if (response.length === 0) {
                return { "message": "Nenhum resultado encontrado", "status_code": 200 }
            }

            return { "message": "Busca realizada com sucesso", "response": response, "status_code": 200 }

        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },
    naverData: async (id)  => {
        //TERMINAR PARTE DO INNER JOIN COM PROJECTS
        try {
            const response = await NaversRepository.naverData(id);4
            
            if (response.length === 0) {
                return { "message": "Nenhum resultado encontrado", "status_code": 200 }
            } else {
                return { "message": "Busca realizada com sucesso", "response": response, "status_code": 200}
            }

        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    }
}
