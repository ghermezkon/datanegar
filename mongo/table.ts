const table = 'table';
module.exports = function (app, db) {
    app.get('/'+table, (req, res)=>{
        db.collection(table).find({}).toArray((err, data)=>{
            res.json(data);
        })
    })
    app.get('/'+table+'/:code/:title', (req, res)=>{
        db.collection(table).find({$or: [{code: req.params.code}, {title: req.params.title}]}).toArray((err, data)=>{
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
        db.collection(table).update({code: req.body.code}, req.body, (err, data)=>{
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(201);
            }
        })
    })
}