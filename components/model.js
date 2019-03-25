const db = require('./db');
const {ObjectId} = require('mongodb');

module.exports = class Model {
    entity = this.props.entity;
    roles = this.props.roles;

    validateFields = (fields, next) => {
        let new_fields = {};
        let error_note = '';
        for(let role of Object.entries(this.roles)){
            if(fields[role[0]]){
                let max_length = role[1].max_length;
                let min_length = role[1].min_length;
                let length = role[1].length;
                if(min_length){
                    if(fields[role[0]].length < min_length){
                        error_note = "طول فیلد " + role[0] + " حداقل " + min_length + " می تواند باشد.";
                        break;
                    }
                }
                if(max_length){
                    if(fields[role[0]].length > max_length){
                        error_note = "طول فیلد " + role[0] + " حداکثر " + max_length + " می تواند باشد.";
                        break;
                    }
                }
                if(length){
                    if(fields[role[0]].length !== length){
                        error_note = "طول فیلد " + role[0] + " باید " + length + " باشد.";
                        break;
                    }
                }
                new_fields[role[0]] = fields[role[0]];
            }else{
                if(role[1].required){
                    error_note = "فیلد " + role[0] + " الزامی است.";
                    break;
                }
            }
        }
        if(error_note){
            next({
                status: false,
                note: error_note
            });
        }else{
            next(null, new_fields);
        }
    };

    getMany = (req, res, next) => {
        let mydb = new db();
        mydb.getMany({
            collection: this.entity,
            query: req.params.query
        }, (err, result) => {
            if(err){
                next(err);
            }else{
                res.status(200).send(result)
            }
        });
    };

    post = (req, res, next) => {
        this.validateFields(req.body, (err, fields) => {
            if(err){
                res.status(400).send(err);
            }else{
                let mydb = new db();
                mydb.insertOne({
                    collection: this.entity,
                    data: fields
                }, (err, result) => {
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send(result);
                    }
                });
            }
        });
    };

    getOne = (req, res, next) => {
        let mydb = new db();
        mydb.getOne({
            collection: this.entity,
            query: {_id: ObjectId(req.params.id)}
        }, (err, result) => {
            if(err){
                next(err);
            }else{
                res.status(200).send(result);
            }
        });
    };

    getOneWithCondition = (req, res, next) => {
        let mydb = new db();
        mydb.getOne({
            collection: this.entity,
            query: req.params.query
        }, (err, result) => {
            if(err){
                next(err);
            }else{
                res.status(200).send(result);
            }
        });
    };

    put = (req, res) => {
        this.validateFields(req.body, (err, fields) => {
            if(err){
                res.status(400).send(err);
            }else{
                let mydb = new db();
                mydb.updateOne({
                    collection: this.entity,
                    query: {_id: ObjectId(req.params.id)},
                    values: fields
                }, (err, result) => {
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send({status: 'true'});
                    }
                });
            }
        });
    };

    delete = (req, res) => {
        let mydb = new db();
        mydb.deleteOne({
            collection: this.entity,
            query: {_id: ObjectId(req.params.id)}
        }, (err, result) => {
            if(err){
                next(err);
            }else{
                res.status(200).send(result);
            }
        });
    };
};
