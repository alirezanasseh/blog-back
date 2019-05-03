const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../components/model');
const userModel = require('../models/users');
const permissionModel = require('../models/permissions');

const jsonParser = bodyParser.json();
let user = new model(userModel);
let permission = new model(permissionModel);

router.route('/').post(jsonParser, (req, res) => {
    user.getOneByCondition(req, res, (result) => {
        if(!result.data){
            result.status = false;
            result.note = "نام کاربری یا رمز عبور اشتباه است.";
            res.status(200).send(result);
        }else{
            permission.getMany({
                body: {
                    role: {$in: result.data.item.roles}, 
                    "permissions.get": {$exists: true},
                },
                params: {
                    fields: ["module"]
                }
            }, res, (permission_result) => {
                console.log(permission_result);
                let models = [];
                for(let i = 0; i < permission_result.data.list.length; i++){
                    let data = permission_result.data.list[i];
                    models.push({module: data.module, permissions: ["get"]});
                }
                result.data.item.allowed_urls = models;
                res.status(200).send(result);
            });
        }
    });
});

module.exports = router;