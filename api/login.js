const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const userModel = require('../models/users');;

const jsonParser = bodyParser.json();
let user = new model(userModel);

router.route('/').post(jsonParser, user.getOneWithCondition);

module.exports = router;