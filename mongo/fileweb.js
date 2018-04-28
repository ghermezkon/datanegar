const 
  //DIR = './dist/assets/uploads/',
  DIR = './uploads/',
  tableDB = 'fileweb',
  multer = require('multer'),  
  express = require('express'),
  _objectId = require('mongodb').ObjectID,
  router = express.Router();
//---------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//---------------------------------------
router
  .get('/', (req, res) => {
    req.app.db.collection(tableDB).find({}).toArray((err, data) => {
      res.json(data);
    });
  })
  //---------------------------------------
  .post('/', (req, res) => {
    req.app.db.collection(tableDB).insertOne(req.body, (err, data) => {
      if (err) {
        res.send(err);
        res.end();
      } else {
        res.send(data)
        res.end();        
      }
    });
  })
  //---------------------------------------
  .put('/',(req, res) => {
    let _id = req.body._id;
    delete req.body._id;
    req.app.db.collection(tableDB).update({ _id: _objectId(_id) }, req.body, (err, data) => {
      if (err) {
        res.send(err);
        res.end();
      } else {          
        res.send(data);
        res.end();
      }
    })
  })
  //---------------------------------------
  .get('/:fileName', (req, res) => {
    req.app.db.collection(tableDB).find({ 'fileHeader.fileName': req.params.fileName }).toArray((err, data) => {
      res.json(data);
    });
  })
  //---------------------------------------
  .post('/file', (req, res) => {
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
      if (err) {
        return res.end(err.toString());
      }
      res.end('OK');
    });
  })
  //---------------------------------------  
module.exports = router
