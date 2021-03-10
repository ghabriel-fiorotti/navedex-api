const db = require('../../db')

module.exports = {
    naversListAll : async () =>{
        try {
            const response = await db('navers');
            return response;
        } catch (error) {
            return error;
        }
    },
    naversListByFilter : async (data) =>{
        try {
            const  response = await db('navers').where(data.companyTime).orWhere(data.OutroCampo)
            return response;
        } catch (error) {
            return error;
        }
    },


    naverDataId : async (id) =>{
        try {
            const responseNavers = await db('navers').select('id','naver_name', 'birthdate', 'admission_date', 'job_role').where('id', id)
            return responseNavers;
        } catch (error) {
            return error;
        }
    },
    projectDataNaverId : async(id) => {
        try {
            const responseProjects = await db('projects').select('projects.id', 'project_name').where('navers_id', id)
            return responseProjects;
        } catch (error) {
            return error;
        }
        
    }

}
