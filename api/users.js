const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const userModel = require('../models/users');

const jsonParser = bodyParser.json();
let user = new model(userModel);

router.route('/').get(function(req, res, next){
    user.getMany(req, res, result => {
        res.status(200).send(result);
    });
}).post(jsonParser, user.post.bind(user));
router.route('/:id').get(user.getOneById.bind(user)).put(user.put.bind(user)).delete(user.deleteById.bind(user));

module.exports = router;