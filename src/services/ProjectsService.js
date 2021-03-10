const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ProjectsRepository = require('../repositories/ProjectsRepository')
require('dotenv').config()

module.exports = {
    projectsList: async (data) => {
        let response;

        try {
            console.log(data)
            if (Object.keys(data).length === 0) {
                response = await ProjectsRepository.projectsListAll();
            } else {
                response = await ProjectsRepository.projectsListByFilter(data);
            }

            if (response.length === 0) {
                return { "message": "Nenhum resultado encontrado", "status_code": 200 }
            }

            return { "message": "Busca realizada com sucesso", "response": response, "status_code": 200 }

        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    }
}

