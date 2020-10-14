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

router.get('/map', function (req, res){
  ref = db.ref("/");
  let docs = {};
  ref.on("value", function(snapshot) {
    docs = snapshot.val();
  })

  res.render('map', {
    "jmap" : docs,
    lat : 40.78854,
    lng : -73.96374
  });
})

router.get('/mapjson/:name', function (req, res){
  if(req.params.name){
    ref = db.ref(req.params.name);
    ref.on("value", function (snapshot){
      res.json(snapshot.val());
    })
  }
})

router.get('/maplayers', function (req, res){
  ref = db.ref("/");
  ref.on("value", function(snapshot) {
    res.json(snapshot.val());
  })
})

module.exports = router;
