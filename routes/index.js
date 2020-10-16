var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = require("../leaflet-firebase-firebase-adminsdk-2x5rx-62ed6dad6b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://leaflet-firebase.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addmarker', function (req, res) {
  const coord = req.body.coord.split(',');
  const lat = coord[0];
  const lng = coord[1];
  ref = db.ref("/marker");
  ref.set({
    lat, lng
  })
  res.send("marker added");
})

router.get('/getmarker', function (req, res){
  ref = db.ref("/marker");
  ref.once("value")
      .then(function (data) {
        res.json(data.val());
      })
})

router.get('/map', async function (req, res){
  ref = db.ref("/layers");
  const docs = await ref.once("value")
      .then(function (data){
        return data.val();
      })
      .catch(function (err) {
        console.log(err);
      })
  res.render('map', {
    "jmap" : docs,
    lat : 40.78854,
    lng : -73.96374
  });
})

router.get('/mapjson/:name', function (req, res){
  if(req.params.name){
    ref = db.ref("/layers/" + req.params.name);
    ref.once("value")
        .then(function (data) {
          res.json(data.val());
        })
        .catch(function (err) {
          console.log(err);
        })
  }
})

router.get('/maplayers', function (req, res){
  ref = db.ref("/layers");
  ref.once("value")
      .then(function (data) {
        res.json(data.val());
      })
      .catch(function (err) {
        console.log(err);
      })
})

module.exports = router;
