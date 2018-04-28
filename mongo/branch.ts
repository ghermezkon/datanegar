const table = 'branch';
module.exports = function (app, db) {
    app.get('/'+table+'/:field/:value', (req, res) => {
        var query = '{"'+req.params.field+'":"'+req.params.value+'"}';
        db.collection(table).find(JSON.parse(query)).toArray((err, data) => {
            res.json(data);
        });
    })
    app.get('/'+table+'/:branchId/:branchName', (req, res) => {
        db.collection(table).find({$or: [{branchId: req.params.branchId}, {branchName: req.params.branchName}]}).toArray((err, data)=>{
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