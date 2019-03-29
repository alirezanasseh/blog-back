const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const permissionModel = require('../models/permissions');;

const jsonParser = bodyParser.json();
let permission = new model(permissionModel);

router.route('/').get(permission.getMany).post(jsonParser, permission.post.bind(permission));
router.route('/:id').get(permission.getOneWithId).put(permission.put).delete(permission.delete);

module.exports = router;