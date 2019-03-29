const cors = require('cors');
const express = require('express');
const users = require('./api/users');
const login = require('./api/login');
const permissions = require('./api/permissions');
// const log = require('./components/log');
const helmet = require('helmet');

const app = express();
const port = 4000;

app.use(cors());
app.options('*', cors());
app.use(helmet());
// app.use(log({a: 1}));
app.use('/login', login);
app.use('/users', users);
app.use('/permissions', permissions);

app.listen(port, () => console.log(`App is listening on port ${port}!`));
