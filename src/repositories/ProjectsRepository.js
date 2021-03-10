const db = require('../../db')

module.exports = {
    projectsListAll: async () => {
        try {
            const response = await db('projects');
            return response;
        } catch (error) {
            return error;
        }
    },
    projectsListByFilter: async (data) => {
        try {
            const response = await db('projects').select('id', 'project_name').where('project_name', data.projectName)
            return response;
        } catch (error) {
            return error;
        }
    },
    projectDataId: async (id) => {
        try {
            const responseProjects = await db('projects').select('id', 'project_name').where('id', id)
            return responseProjects;
        } catch (error) {
            return error;
        }
    },

    naversProjectsId: async (id) => {
        try {
            const responseNavers = await db('navers')
                .join('projects_navers', 'navers_id', '=', 'navers.id')
                .select('id', 'naver_name', 'birthdate', 'admission_date', 'job_role')
                .where('projects_navers.projects_id', id)

            return responseNavers;
        } catch (error) {
            return error;
        }
    },
    insertProjects: async (data, userId) => {
        try {
            const response = await db('projects').insert({ "project_name": data.name, "users_id": userId.id });
            return response;
        } catch (error) {
            return error;
        }
    },
    insertNaversProjects: async (projectsId, naversId) => {
        try {
            const response = await db('projects_navers').insert({ "projects_id": projectsId, "navers_id": naversId });
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    },
    updateProjects: async (data, params) => {
        try {
            const response = await db('projects').where({ 'id': params.idProject, "users_id": params.idUser }).update({ "project_name": data.name });
            console.log(response)
            return response
        } catch (error) {
            return `${error}`
        }
    },

    deleteNaversProjects: async (params) => {
        try {
            const response = await db('projects_navers').where('projects_id', params.idProject).del();
            return response
        } catch (error) {
            return error;
        }
    },
    deleteProjects: async (params) => {
        try {
            const response = await db('projects').where({ 'id': params.idProject, "users_id": params.idUser }).del();
            return response;
        } catch (error) {
            return error;
        }
    }
}