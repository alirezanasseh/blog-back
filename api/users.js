const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const userModel = require('../models/users');;

const jsonParser = bodyParser.json();
let user = new model(userModel);

router.route('/').get(user.getMany).post(jsonParser, user.post);
router.route('/:id').get(user.getOneWithId).put(user.put).delete(user.delete);

module.exports = router;