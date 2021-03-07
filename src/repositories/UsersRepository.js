const db = require('../../db')

module.exports = {
    getUserByEmail: async (data) => {
        try {
            const response = await db('users').where({email: data.email})
            return response[0]
        } catch (error) {
            return error;
        }   
    },
    
    registerUser: async (data) => {
        try {
            const response = await db('users').insert(data)
            return response[0]
        } catch (error) {
            return error;
        } 
    }
}