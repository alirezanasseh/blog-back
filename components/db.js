const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const database = "mydb";

module.exports = class DB {
    
    insertOne(props, next){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
            if (err){
                next(err);
            }else{
                var dbo = db.db(database);
                dbo.collection(props.collection).insertOne(props.data, (err, res) => {
                    if (err){
                        next(err);
                    }else{
                        next(null, res);
                        db.close();
                    }
                });
            }
        });
    }

    getOne(props, next){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
            if (err){
                next(err);
            }else{
                var dbo = db.db(database);
                dbo.collection(props.collection).findOne(props.query, function(err, result) {
                    if (err){
                        next(err);
                    }else{
                        next(null, result);
                        db.close();
                    }
                });
            }
        });
    }

    getMany(props, next){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
            if (err){
                next(err);
            }else{
                var dbo = db.db(database);
                if(!props.limit){
                    props.limit = 0;
                }
                dbo.collection(props.collection).find(props.query).sort(props.sort).limit(props.limit).toArray((err, result) => {
                    if(err){
                        next(err);
                    }else{
                        next(null, result);
                        db.close();
                    }
                });
            }
        });
    }

    updateOne(props, next){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
            if(err){
                next(err);
            }else{
                var dbo = db.db(database);
                var values = {$set: props.values};
                dbo.collection(props.collection).updateOne(props.query, values, (err, res) => {
                    if(err){
                        next(err);
                    }else{
                        next(null, res);
                        db.close();
                    }
                });
            }
        });
    }

    deleteOne(props, next){
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
            if(err){
                next(err);
            }else{
                var dbo = db.db(database);
                dbo.collection(props.collection).deleteOne(props.query, (err, obj) => {
                    if(err){
                        next(err);
                    }else{
                        next(null, {status: 'true'});
                        db.close();
                    }
                });
            }
        });
    }
}