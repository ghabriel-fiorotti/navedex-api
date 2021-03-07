const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const users = require('./src/routes/users');

app.use(express.json());


app.use('/users', users);


app.listen(PORT);

console.log('Running at Port 3000');