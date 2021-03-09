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
    naverData : async (id) =>{
        try {
            const response = await db('navers').where('id', id);
            return response;
        } catch (error) {
            return error;
        }
    }

}