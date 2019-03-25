var express = require('express');
var users = require('./api/users');
// var log = require('./components/log');
var helmet = require('helmet');

const app = express();
const port = 3000;

app.use(helmet());
// app.use(log({a: 1}));
app.use('/users', users);

app.listen(port, () => console.log(`App is listening on port ${port}!`));
