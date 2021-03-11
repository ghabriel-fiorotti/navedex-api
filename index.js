const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const users = require('./src/routes/users');
const navers = require('./src/routes/navers');
const projects = require('./src/routes/projects');

app.use(express.json());

app.use('/users', users);
app.use('/navers', navers);
app.use('/projects', projects);


app.listen(PORT);

console.log('Running at Port '+ PORT );