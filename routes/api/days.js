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
  var dayId = req.params.id;
  Day.findOne({
    number: dayId
  }).then(function(result){
    return result.update({
      hotelId: hotelId
    });
  }).then(function(){
    res.end();
  });
})

router.put('/days/:id/restaurant', function(req, res, next){
  var restaurantId = (req.body.restaurantId).replace(/[^\d.]/g, '');
  var dayId = req.params.id;
  Day.findOne({
    number: dayId
  }).then(function(result){
    Restaurant.findById(restaurantId)
    .then(function(restaurant){
      return result.addRestaurant(restaurant);
    });
  }).then(function(){
    res.end();
  })
})

router.put('/days/:id/activity', function(req, res, next){
  var activityId = (req.body.activityId).replace(/[^\d.]/g, '');
  var dayId = req.params.id;
  Day.findOne({
    number: dayId
  }).then(function(result){
    Activity.findById(activityId)
    .then(function(activity){
      return result.addActivity(activity);
    });
  }).then(function(){
    res.end();
  });
});


module.exports = router;
