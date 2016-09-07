var router = require('express').Router();

var Day = require('../models/day');
var Meal = require('../models/meal');
var Stay = require('../models/stay');
var Adventure = require('../models/adventure');

var Restaurant = require('../models/restaurant');
var Hotel = require('../models/hotel');
var Activity = require('../models/activity');
var Place = require('../models/place');

module.exports = router;

var meals = {
  model: Meal,
  include: [ { 
    model: Restaurant,
    include: [ Place ]
  } ]
};

var stays = {
  model: Stay,
  include: [{
    model: Hotel,
    include: [ Place ]
  }]
};

var adventures = {
  model: Adventure,
  include: [{
    model: Activity,
    include: [ Place ]
  }]
};

router.get('/', function(req, res, next){
  Day.findAll({ include: [ meals, stays, adventures ]})
    .then(function(days){
      return days.map(function(day){
        var obj = {};
        obj.id = day.id;
        obj.restaurants = day.meals.map(function(meal){ 
          return meal.restaurant;
        });
        obj.hotels = day.stays.map(function(stay){
          return stay.hotel;
        });
        obj.activities = day.adventures.map(function(adventure){
          return adventure.activity;
        });
        return obj;
      });
    })
    .then(function(days){
      res.send(days);
    })
    .catch(next);
});

router.post('/', function(req, res, next){
  Day.create()
  .then(function(newDay){
    return Day.findOne({
      where: {id: newDay.id}
    }, {
      include: [meals, stays, adventures]
    });
  })
  .then(function(day){
    var obj = {};
    obj.id = day.id;
    obj.restaurants = [];
    obj.hotels = [];
    obj.activities = [];
    return obj;
  })
  .then(function(day){
    res.send(day);
  })
  .catch(next);
});

router.post('/delete/:id', function(req, res, next){
  Day.destroy({
    where: {
      id: req.params.id*1
    }
  })
  .then(function(){
    res.sendStatus(200);
  })
  .catch(next);
});
