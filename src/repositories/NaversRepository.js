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
            const  response = await db('navers').where(data)
            return response;
        } catch (error) {
            return error;
        }
    },

}