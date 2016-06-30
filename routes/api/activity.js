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
module.exports = router;
