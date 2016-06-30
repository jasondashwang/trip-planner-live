var express = require('express');
var router = express.Router();
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Promise = require('bluebird');


router.get('/activities' , function (req, res, next) {
  var findingActivities = Activity.findAll({
    include: [Place]
  });

  findingActivities.then(function(result){
    res.send(result);
  });

});

router.get('/activities/:id' , function (req, res, next ) { 
  var id = (req.params.id).replace(/[^\d.]/g, '');

  Activity.findOne({
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
