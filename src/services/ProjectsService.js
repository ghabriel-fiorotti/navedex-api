const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ProjectsRepository = require('../repositories/ProjectsRepository');
const { response } = require('express');
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
    },
    projectsData : async (id) => {
        try {
            const responseprojectsId = await ProjectsRepository.projectDataId(id);
            const responseNaversProjectsId = await ProjectsRepository.naversProjectsId(id)
            
            function formatDate(date) {
                let actualDate = new Date(date);
                console.log(actualDate)
                const actualYear = actualDate.getFullYear();
                let actualMonth = actualDate.getMonth() + 1;
                let actualDay = actualDate.getDate();
                actualMonth = actualMonth < 10 ? "0" + actualMonth : actualMonth
                actualDay = actualDay < 10 ? "0" + actualDay : actualDay

                return `${actualYear}-${actualMonth}-${actualDay}`
            }
            responseNaversProjectsId[0]["birthdate"] = formatDate(responseNaversProjectsId[0]["birthdate"])
            responseNaversProjectsId[0]["admission_date"] = formatDate(responseNaversProjectsId[0]["admission_date"])
            responseprojectsId[0]["navers"] = responseNaversProjectsId;

            if (responseprojectsId.length === 0) {
                return { "message": "Nenhum resultado encontrado", "status_code": 200 }
            } else {
                return { "message": "Busca realizada com sucesso", "response": responseprojectsId, "status_code": 200 }
            }

        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },
    store: async (data, idUser) => {
        try {
            const responseInsertProjects = await ProjectsRepository.insertProjects(data, idUser );
            for (let index = 0; index < (data.navers).length; index++) {
                let responseInsertProjectsNavers = await ProjectsRepository.insertNaversProjects( responseInsertProjects[0], data.navers[index],);
            }
            return { "message": "Naver inserido com sucesso", "response": data, "status_code": 201 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },
    update: async (data, params) => {
        try {
            const responseUpdateProjects = await ProjectsRepository.updateProjects(data, params );
            const responseDeleteProjectsNavers = await ProjectsRepository.deleteNaversProjects(params)

            for (let index = 0; index < (data.navers).length; index++) {
                await ProjectsRepository.insertNaversProjects( responseUpdateProjects[0], data.navers[index],);
            }
            return { "message": "Projeto atualizado com sucesso", "response": data, "status_code": 201 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422 }
        }
    },
    delete : async(params) => {
        try {
            const responseDeleteProjects = await ProjectsRepository.deleteProjects(params);
            const responseDeleteProjectsNavers = await ProjectsRepository.deleteNaversProjects(params);
            return { "message": "Naver deletado com sucesso", "status_code": 200 }
        } catch (error) {
            return { "message": "Erro no banco de dados", "status_code": 422, error }
        }
    } 
}

