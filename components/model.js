const db = require('./db');
const {ObjectId} = require('mongodb');

module.exports = class Model {
    constructor(props){
        this.entity = props.entity;
        this.fields = props.fields;
    }

    validateFields(fields, method, next){
        let new_fields = {};
        let error_note = '';
        for(let field of Object.entries(this.fields)){
            if(fields[field[0]]){
                if(!field[1].exceptions || field[1].exceptions.indexOf(fields[field[0]]) < 0){
                    let max_length = field[1].max_length;
                    let min_length = field[1].min_length;
                    let length = field[1].length;
                    if(min_length){
                        if(fields[field[0]].length < min_length){
                            error_note = "طول فیلد " + field[0] + " حداقل " + min_length + " می تواند باشد.";
                            break;
                        }
                    }
                    if(max_length){
                        if(fields[field[0]].length > max_length){
                            error_note = "طول فیلد " + field[0] + " حداکثر " + max_length + " می تواند باشد.";
                            break;
                        }
                    }
                    if(length){
                        if(fields[field[0]].length !== length){
                            error_note = "طول فیلد " + field[0] + " باید " + length + " باشد.";
                            break;
                        }
                    }
                    new_fields[field[0]] = fields[field[0]];
                }
            }else if(method !== 'get'){
                if(field[1].required){
                    error_note = "فیلد " + field[0] + " الزامی است.";
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
    }

    getOneById(req, res, next){
        let mydb = new db();
        mydb.getOne({
            collection: this.entity,
            query: {_id: ObjectId(req.body.id)},
            params: req.params
        }, (err, result) => {
            if(err){
                next({status: false, note: err});
            }else{
                next({status: true, data: {item: result}});
            }
        });
    }

    getOneByCondition(req, res, next){
        this.validateFields(req.body, 'get', (err, fields) => {
            if(err){
                next({status: false, note: err});
            }else{
                let mydb = new db();
                mydb.getOne({
                    collection: this.entity,
                    query: fields,
                    params: req.params
                }, (err, result) => {
                    if(err){
                        next({status: false, note: err});
                    }else{
                        next({status: true, data: {item: result}});
                    }
                });
            }
        })
    }

    getMany(req, res, next){
        this.validateFields(req.body, 'get', (err, fields) => {
            if(err){
                next({status: false, note: err});
            }else{
                let mydb = new db();
                mydb.getMany({
                    collection: this.entity,
                    query: fields,
                    params: req.params
                }, (err, result) => {
                    if(err){
                        next({status: false, note: err});
                    }else{
                        next({status: true, data: {list: result}});
                    }
                });
            }
        });
        
    }

    post(req, res, next){
        this.validateFields(req.body, 'post', (err, fields) => {
            if(err){
                next({status: false, note: err});
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
    }

    put(req, res){
        this.validateFields(req.body, (err, fields) => {
            if(err){
                next({status: false, note: err});
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
    }

    deleteById(req, res){
        let mydb = new db();
        mydb.deleteOne({
            collection: this.entity,
            query: {_id: ObjectId(req.params.id)}
        }, (err, result) => {
            if(err){
                next({status: false, note: err});
            }else{
                res.status(200).send(result);
            }
        });
    }

    deleteByCondition(req, res){
        this.validateFields(req.body, 'get', (err, fields) => {
            if (err) {
                next({status: false, note: err});
            } else {
                let mydb = new db();
                mydb.deleteMany({
                    collection: this.entity,
                    query: fields
                }, (err, result) => {
                    if(err){
                        next({status: false, note: err});
                    }else{
                        res.status(200).send(result);
                    }
                });
            }
        });
    }
};
