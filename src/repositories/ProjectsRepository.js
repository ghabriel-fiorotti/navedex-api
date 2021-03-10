const db = require('../../db')

module.exports = {
    projectsListAll : async () => {
        try {
            const response = await db('projects');
            return response;
        } catch (error) {
            return error;
        }
    },
    projectsListByFilter: async (data) => {
        try {
            const response = await db('projects').where('project_name', data.projectName)
            return response;
        } catch (error) {
            return error;
        }
    },
}