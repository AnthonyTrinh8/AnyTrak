var express = require('express');
var mysql = require('./dbcon.js');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');


handlebars.handlebars.registerHelper('if_eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.argv[2]);


//Renders Home page
app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM trains', function(error, results, fields){
    res.render('home');
  });
});



function getStation(res, mysql, context, complete) {
  mysql.pool.query("SELECT stationname, address, state, city, zipcode FROM stations WHERE state = ?", function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.data = result;
    // console.log(result);
    complete();
  });
}

function getStationsbyState(req, res, mysql, context, complete){
  var query = "SELECT stationname, address, state, city, zipcode FROM stations WHERE state = ?";
  var filter = [req.params.stationID];
  console.log(filter);
  mysql.pool.query(query, filter, function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.data = results;
    complete();
  });
}

app.get('/stations/search/:stationID', function(req, res){
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  context.jsscripts = ["public/index.js"];
  getStationsbyState(req, res, mysql, context, complete);
  getStation(res, mysql, context, complete);
  function complete(){
    callbackCount++;
    if(callbackCount >= 2){
      res.render('stations', context);
      // res.status(200).send("success");
      return;
    }
  }
});

//Renders Stations page
app.get('/stations', function (req, res) {
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  getStation(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if (callbackCount >= 1) {
      res.render('stations', context);
      res.status(200).send("success");
    }
  }
  // mysql.pool.query('SELECT * FROM stations', function(error, results, fields){
  //   res.render('stations', {data: results});
  // });
});

// app.get('/stations/search', function(req, res, next) {
//   var query = "SELECT * FROM stations WHERE state=?";
//   var filter = req.body.filter;
//   mysql.pool.query(query, [filter], function(error, results, fields) {
//     if (error) {
//       return next(error);
//     } else {
//       res.render('stations', {data: results});
//       res.status(200).send(results);
//     }
//   });
// });



//Renders Trains page
app.get('/trains',function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM trains', function(error, results, fields){
    if (error) {
      return next(error);
    } else {
      var context1 = results;
      mysql.pool.query('SELECT stationID, stationname FROM stations', function (error, results, fields) {
        if (error) {
          return next(error);
        } else {
          var context2 = results;
          res.render('trains', {data: context1, data1: context2});
        }
      });
    }
  });
});

//Renders Routes + RoutesThruStations page
app.get('/routes', function(req, res, next) {
  var context = {};
  mysql.pool.query('SELECT * FROM routes', function(error, results, fields) {
    if (error) {
      return next(error);
    } else {
      var context1 = results;
      mysql.pool.query('SELECT * FROM routesthrustations', function(error, results, fields) {
        if (error) {
          return next(error);
        } else {
          var context2 = results;
          mysql.pool.query('SELECT trainID FROM trains ORDER BY trainID', function (error, results, fields) {
            if (error) {
              return next(error);
            } else {
              var context3 = results;
              mysql.pool.query('SELECT * FROM stations ORDER BY stationID', function(error, results, fields) {
                if (error) {
                  return next(error);
                } else {
                  var context4 = results;
                  res.render('routes', {routes: context1, routesthrustations: context2, trains: context3, stations: context4});
                }
              });
            }
          });
        }
      });
    }
  });
});

//Inserts one station entity
app.post('/stations/create', function (req, res, next) {
  if (req.body && req.body.station_name_input && req.body.station_address_input
    && req.body.station_state_input && req.body.station_city_input &&
    req.body.station_zipcode_input) {
      var station_name = req.body.station_name_input;
      var station_address = req.body.station_address_input;
      var station_state = req.body.station_state_input;
      var station_city = req.body.station_city_input;
      var station_zipcode = req.body.station_zipcode_input;

      var query = "INSERT INTO stations (stationname, address, state, city, zipcode) VALUES (?,?,?,?,?)";
      mysql.pool.query(query, [station_name, station_address, station_state, station_city, station_zipcode], function (error, results, fields) {
        if (error) {
          return next(error);
        } else {
          res.status(200).send("Successfully added station to database.");
        }
      });
  } else {
    res.status(400).send({ error: "All fields must be filled." });
  }
});

//Inserts one train entity
app.post('/trains/create', function (req, res, next) {
  if (req.body && req.body.train_model_input && req.body.train_cost_input &&
      req.body.train_capacity_input && req.body.train_first_input &&
      req.body.train_last_input) {
        console.log(req.body);
        var station_id = req.body.station_id_input;
        var train_model = req.body.train_model_input;
        var train_cost = req.body.train_cost_input;
        var train_capacity = req.body.train_capacity_input;
        var train_first = req.body.train_first_input;
        var train_last = req.body.train_last_input;
        console.log(req.body);
        var query = "INSERT INTO trains (stationID, model, cost, capacity, conductorfirstname, conductorlastname) VALUES (?,?,?,?,?,?)";
        mysql.pool.query(query, [station_id, train_model, train_cost, train_capacity, train_first, train_last], function (error, results, fields) {
          if (error) {
            return next(error);
          } else {
            res.status(200).send("Successfully added train to database.");
          }

        });
  } else {
    res.status(400).send({ error: "All input fields must be filled."})
  }
});

app.post('/routes/create', function(req, res, next) {
  if (req.body && req.body.route_name && req.body.train_on_route && req.body.ticket_price) {
    console.log(req.body);
    var route_name = req.body.route_name;
    var train_on_route = req.body.train_on_route;
    var ticket_price = req.body.ticket_price
    var query = "INSERT INTO routes (trainID, routename, ticketprice) VALUES (?,?,?)";
    mysql.pool.query(query,[train_on_route, route_name, ticket_price], function (error, results, fields) {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Successfully added route to database.");
      }


    });
  } else {
    res.status(400).send( { error: "All input fields must be filled."});
  }
});

app.post('/routesthrustations/create', function(req, res, next) {
  if(req.body && req.body.route && req.body.station) {
        var route = req.body.route;
        var station = req.body.station;
        var travel_duration = req.body.travel_duration;
        var miles_traveled = req.body.miles_traveled;
        var query = "INSERT INTO routesthrustations (routeID, stationID, travelduration, milestraveled) VALUES (?,?,?,?)";
        mysql.pool.query(query, [route, station, travel_duration, miles_traveled], function (error, results, fields) {
          if (error) {
            return next(error);
          } else {
            res.status(200).send("Successfully added stations to routesthrustations in database");
          }
        });
  } else {
    res.status(400).send( { error: "Input fields for routes and stations must be filled."});
  }
});



app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
