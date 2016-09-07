var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = require('./day');
var Meal = require('./meal');
var Stay = require('./stay');
var Adventure = require('./adventure');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Meal.belongsTo(Restaurant);
Day.hasMany(Meal);

Stay.belongsTo(Hotel);
Day.hasMany(Stay);

Adventure.belongsTo(Activity);
Day.hasMany(Adventure);

module.exports = db;
