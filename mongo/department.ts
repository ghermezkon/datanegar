const table = 'dep';
module.exports = function (app, db) {
    app.get('/'+table+'/:depId', (req, res) => {
        db.collection(table).find({ depId: req.params.depId }).toArray((err, data) => {
            res.json(data);
        });
    })
    app.get('/'+table, (req, res)=>{
        db.collection(table).find({}).toArray((err, data)=>{
            res.json(data);
        })
    })
    app.get('/'+table+'/:depId/:depName', (req, res)=>{
        db.collection(table).find({$or: [{depId: req.params.depId}, {depName: req.params.depName}]}).toArray((err, data)=>{
            res.json(data);
        });
    })
    app.post('/'+table, (req, res) => {
        db.collection(table).insertOne(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(201);
            }
        });
    })
    app.put('/'+table, (req, res)=>{
        delete req.body._id;
        db.collection(table).update({depId: req.body.depId}, req.body, (err, data)=>{
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(201);
            }
        })
    })
}