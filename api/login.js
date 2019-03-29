const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const userModel = require('../models/users');;
const permissionModel = require('../models/permissions');

const jsonParser = bodyParser.json();
let user = new model(userModel);
let permission = new model(permissionModel);

router.route('/').post(jsonParser, (req, res) => {
    user.getOneWithCondition(req, res, (result) => {
        if(!result.data){
            result.status = false;
            result.note = "نام کاربری یا رمز عبور اشتباه است.";
            res.status(200).send(result);
        }else{
            permission.getMany({
                body: {
                    role: {$in: result.data.roles}, 
                    "permissions.get": {$exists: true},
                    fields: ["model"]
                }
            }, res, (result) => {
                res.status(200).send(result);
            });
        }
    });
});

module.exports = router;