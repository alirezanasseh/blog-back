const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const permissionModel = require('../models/permissions');;

const jsonParser = bodyParser.json();
let permission = new model(permissionModel);

router.route('/').get(permission.getMany.bind(permission)).post(jsonParser, permission.post.bind(permission));
router.route('/:id').get(permission.getOneWithId.bind(permission)).put(permission.put.bind(permission)).delete(permission.delete.bind(permission));

module.exports = router;