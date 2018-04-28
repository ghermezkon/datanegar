const
    tableDB = 'article',
    express = require('express'),
    _objectId = require('mongodb').ObjectID,
    router = express.Router();
//---------------------------------------
router
    .get('/', (req, res) => {
        req.app.db.collection(tableDB).find({}).toArray((err, data) => {
            res.json(data);
        })
    })
    //---------------------------------------
    .get('/:articleCode', (req, res) => {
        req.app.db.collection(tableDB).find({ 'articleHeader.articleCode': req.params.articleCode }).toArray((err, data) => {
            res.json(data);
        });
    })
    .get('/route/:articleRoute', (req, res) => {
        req.app.db.collection(tableDB).find({ 'articleHeader.articleRoute': req.params.articleRoute }).toArray((err, data) => {
            res.json(data);
        });
    })    
    .get('/group/:link', (req, res) => {
        req.app.db.collection(tableDB)
            .find
            (
                { 'articleHeader.articleGroup.link': req.params.link }, {'articleHeader': '1'}
            )
            .toArray((err, data) => {
                res.json(data);
            });
    })       
    //---------------------------------------
    .get('/:articleCode/:articleRoute', (req, res) => {
        req.app.db.collection(tableDB).find({ $or: 
            [{ 'articleHeader.articleCode': req.params.articleCode }, { 'articleHeader.articleRoute': req.params.articleRoute }] })
            .toArray((err, data) => {res.json(data);}
        );
    })
    //---------------------------------------
    .post('/', (req, res) => {
        req.app.db.collection(tableDB).insertOne(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
                res.end();                
            }
        });
    })
    //---------------------------------------
    .put('/', (req, res) => {
        let _id = req.body._id;
        delete req.body._id;
        req.app.db.collection(tableDB).update({ _id: _objectId(_id) }, req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
                res.end();
            }
        })
    })  
    //---------------------------------------
module.exports = router