const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const userModel = require('../models/users');;

const jsonParser = bodyParser.json();
let user = new model(userModel);

router.route('/').get(user.getMany.bind(user)).post(jsonParser, user.post.bind(user));
router.route('/:id').get(user.getOneById.bind(user)).put(user.put.bind(user)).delete(user.deleteById.bind(user));

module.exports = router;