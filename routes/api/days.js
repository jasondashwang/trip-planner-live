var express = require ('express');
var router = express.Router();
var Day = require ('../../models/day');
var Place = require ('../../models/place');
var Activity = require ('../../models/activity');
var Restaurant = require ('../../models/restaurant');
var Hotel = require ('../../models/hotel'); 

router.get('/days', function(req, res, next) {
  Day.findAll({
    include :[Hotel]
  }).then(function(result){
    res.send(result);
  })
})

router.post('/days', function(req, res, next){
  var dayObject = req.body;

  Day.create(dayObject)
  .then(function() {
    res.end();
  })
})

router.put('/days/:id/hotel', function(req, res, next){
  var hotelId = (req.body.hotelId).replace(/[^\d.]/g, '');
  console.log(hotelId)
  // var id = req.params.id;
  // Day.findById(id)
  //   .then(function(result){
  //     result.update()
  //   })
  res.end()
})

module.exports = router;
