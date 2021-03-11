const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const NaversRepository = require('../repositories/NaversRepository')
require('dotenv').config()

module.exports = {
    naversList: async (data) => {
        let response;

        if (data.companyTime) data.companyTime = DiffAdmission(data.companyTime)

        try {
            if (Object.keys(data).length === 0) {
                response = await NaversRepository.naversListAll();
            } else {
                response = await NaversRepository.naversListByFilter(data);
            }

            if (response.length === 0) {
                return { "message": "Nenhum resultado encontrado", "status_code": 200 }
            }

            response[0]["birthdate"] = formatDate(response[0]["birthdate"])
            response[0]["admission_date"] = formatDate(response[0]["admission_date"])

            return { "message": "Busca realizada com sucesso", "response": response, "status_code": 200 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },

    naverData: async (id) => {
        try {
            const responseNaversId = await NaversRepository.naverDataId(id);
            const responseProjectsNaveriD = await NaversRepository.projectDataNaverId(id)


            responseNaversId[0]["projects"] = responseProjectsNaveriD;
            responseNaversId[0]["birthdate"] = formatDate(responseNaversId[0]["birthdate"])
            responseNaversId[0]["admission_date"] = formatDate(responseNaversId[0]["admission_date"])

            if (responseNaversId.length === 0) {
                return { "message": "Nenhum resultado encontrado", "status_code": 200 }
            } else {
                return { "message": "Busca realizada com sucesso", "response": responseNaversId, "status_code": 200 }
            }

        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },

    store: async (data, id) => {
        try {
            const responseInsertNavers = await NaversRepository.insertNavers(data, id);
            for (let index = 0; index < (data.projects).length; index++) {
                let responseInsertProjectsNavers = await NaversRepository.insertProjectsNavers(data.projects[index], responseInsertNavers[0]);
            }
            return { "message": "Naver inserido com sucesso", "response": data, "status_code": 201 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },

    update: async (data, params) => {
        try {
            const responseUpdateNavers = await NaversRepository.updateNavers(data, params)
            const responseDeleteProjectsNavers = await NaversRepository.deleteProjectsNavers(params)

            for (var index in data.projects) {
                await NaversRepository.insertProjectsNavers(data.projects[index], params.idNaver);
            }

            return { "message": "Naver atualizado com sucesso", "response" : data, "status_code": 200 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422, error }
        }
    },

    delete: async (params) => {
        try {
            const responseDeleteNavers = await NaversRepository.deleteNavers(params);
            const responseDeleteProjectsNavers = await NaversRepository.deleteProjectsNavers(params);
            return { "message": "Naver deletado com sucesso", "status_code": 200 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422, error }
        }
    }

}

function formatDate(date) {
    let actualDate = new Date(date);
    const actualYear = actualDate.getFullYear();
    let actualMonth = actualDate.getMonth() + 1;
    let actualDay = actualDate.getDate();
    actualMonth = actualMonth < 10 ? "0" + actualMonth : actualMonth
    actualDay = actualDay < 10 ? "0" + actualDay : actualDay

    return `${actualYear}-${actualMonth}-${actualDay}`
}

function DiffAdmission(data) {
    let currentDate = new Date();
    const admissionYear = parseInt(currentDate.getFullYear()) - data;
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentDay = currentDate.getDate().toString();
    yearAdmission = admissionYear.toString().concat('-', currentMonth, '-', currentDay);
    return yearAdmission
}