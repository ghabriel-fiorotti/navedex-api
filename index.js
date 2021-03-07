const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000
const knex = require('./database')
const select = knex('users');

app.use(express.json());

app.get('/', function(req, res) {
    select.then(data=>{
        console.log(data);
    })
    .catch(e => {
        console.log(e.message);
    })
    .finally(() => {
        
    })
});

app.listen(PORT);

console.log('Running at Port 3000');