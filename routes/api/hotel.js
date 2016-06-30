var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Place = require('../../models/place');
var Promise = require('bluebird');

router.get('/hotels' , function (req, res, next) {
  var findingHotels = Hotel.findAll({
    include: [Place]
  });

  findingHotels.then(function(result){
    res.send(result);
  });

});

router.get('/hotels/:id' , function (req, res, next ) { 
  var id = (req.params.id).replace(/[^\d.]/g, '');

  Hotel.findOne({
    where:{
      id: id,
    },
    include: [Place]
  })
  .then(function(result) {
    res.send(result);
  })
});

module.exports = router;
