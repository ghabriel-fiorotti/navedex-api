const db = require('../../db')

module.exports = {
    naversListAll: async () => {
        try {
            const response = await db('navers');
            return response;
        } catch (error) {
            return error;
        }
    },
    naversListByFilter: async (data) => {
        try {
            const response = await db('navers').where(data.companyTime).orWhere(data.OutroCampo)
            return response;
        } catch (error) {
            return error;
        }
    },


    naverDataId: async (id) => {
        try {
            const responseNavers = await db('navers').select('id', 'naver_name', 'birthdate', 'admission_date', 'job_role').where('id', id)
            return responseNavers;
        } catch (error) {
            return error;
        }
    },
    projectDataNaverId: async (id) => {
        try {

            const responseProjects = await db('projects')
                .join('projects_navers', 'navers_id', '=', 'projects.id')
                .select('projects.id', 'projects.project_name')
                .where('projects_navers.navers_id', id)
            console.log(responseProjects)

            return responseProjects;
        } catch (error) {
            return error;
        }

    },
    insertNavers: async (data, users_id) => {
        try {
            const { naver_name, birthdate, admission_date, job_role } = data;
            const response = await db('navers').insert({ naver_name, birthdate, admission_date, job_role, users_id });
            return response;
        } catch (error) {
            return error;
        }
    },
    insertProjectsNavers: async (projectsId, naversId) => {
        try {
            const response = await db('projects_navers').insert({ "projects_id": projectsId, "navers_id": naversId });
            return response
        } catch (error) {
            return error
        }
    },
    updateNavers: async (data, params) => {
        try {
            const { naver_name, birthdate, admission_date, job_role } = data;
            const response = await db('navers').where({ 'id': params.idNaver, "users_id": params.idUser }).update({ naver_name, birthdate, admission_date, job_role });

            return response
        } catch (error) {
            return `${error}`
        }
    },

    deleteProjectsNavers: async (params) => {
        try {
            const response = await db('projects_navers').where('navers_id', params.idNaver).del();
            return response
        } catch (error) {
            return error;
        }
    },
    deleteNavers : async (params) => {
        try {
            const response = await db('navers').where({ 'id': params.idNaver, "users_id": params.idUser }).del();
            return response;
        } catch (error) {
            return error;
        }
    }
}
