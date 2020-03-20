var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers:{
    if_eq: function (a, b, opts){
      if (a == b)
        return opts.fn(this);
      else
        return opts.inverse(this);
    }
  }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('public'));
app.set('port', process.argv[2]);
app.set('mysql', mysql);




// ---------------------------------------- Functions for individual queries----------------------------------------------//

//Gets the info needed to render the stations page filtered by state
function getDropdown(res, mysql, context, complete) {
  mysql.pool.query("SELECT stationID, state FROM Stations", function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.data_dropdown = result;
    complete();
  });
}

//Gets all station attributes to render the stations page properly
function getStation(res, mysql, context, complete) {
  mysql.pool.query("SELECT stationID, stationname, address, state, city, zipcode FROM Stations", function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.stations = result;
    complete();
  });
}

//Get the Stations that corresponds to the state the user requested.
function getStationsbyState(req, res, mysql, context, complete) {
  var query = "SELECT stationID, stationname, address, state, city, zipcode FROM Stations WHERE state = ?";
  var filter = [req.params.state];
  // console.log(filter);

  mysql.pool.query(query, filter, function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.stations = results;
    // res.status(200).send(results);
    complete();
  });
}

//Gets all attributes from all Stations entries
function getRoute(res, mysql, context, complete) {
  mysql.pool.query('SELECT routeID, trainID, routename, ticketprice FROM Routes', function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.route_data = result;
    // console.log(context.route_data);
    complete();
  });
}

//Gets info needed for user to select Trains FK
function getTrainsonRoutes(res, mysql, context, complete){
  mysql.pool.query('SELECT trainID FROM Trains ORDER BY TrainID', function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.route_train = result;
    // console.log(context.route_train);
    complete();
  });
}

//Gets all attributes from all RoutesThruStations entries
function getRouteDetails(res, mysql, context, complete) {
  mysql.pool.query('SELECT routesthrustationsID, routeID, stationID, travelduration, milestraveled FROM RoutesThruStations', function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.route_details = result;
    complete();
  });
}



//Gets info needed for user to select Stations FK
function getRouteStations(res, mysql, context, complete) {
  mysql.pool.query('SELECT stationID FROM Stations ORDER BY stationID', function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.route_stations = result;
    complete();
  });
}

//Gets all attributes from all Trains entries
function getTrainDetails(res, mysql, context, complete) {
  mysql.pool.query('SELECT trainID, stationID, model, cost, capacity, conductorfirstname, conductorlastname FROM Trains', function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end()
    }
    context.trains = results;
    complete();
  });
}

//Gets info needed for user to select Stations FK
function getStationsDropdown(res, mysql, context, complete) {
  mysql.pool.query('SELECT stationID, stationname FROM Stations ORDER BY stationID', function (error, result, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.stations = result;
    complete();
  });
}

// ---------------------------------------------------------------------------------------------------------------------//






// -------------------------------------------- Gets -------------------------------------------//



//Renders Home page
app.get('/home', function (req, res, next) {
  var context = {};
  res.render('home', context);
});


//Renders Stations page with all the stations and their attributes.
app.get('/stations', function (req, res) {
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  getStation(res, mysql, context, complete);
  getDropdown(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if (callbackCount >= 2) {
      res.render('stations', context);
    }
  }
});

//display the filtered stations. The extantion to the URL is /stations/search/:stationID
app.get('/stations/filter/:state', function (req, res) {
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  getStationsbyState(req, res, mysql, context, complete);
  getDropdown(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if (callbackCount >= 2) {
      res.render('stations', context);
      return;
    }
  }
});

//Renders Trains page
app.get('/trains', function (req, res, next) {
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  getTrainDetails(res, mysql, context, complete);
  getStationsDropdown(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if (callbackCount >=2) {
      res.render('trains',context);
      return;
    }
  }
});

//app.get('/favicon.ico', (req, res) => res.status(204));


//Renders Routes Page
app.get('/routes', function (req, res, next){
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');

  getRoute(res, mysql, context, complete);
  getRouteDetails(res, mysql, context, complete);
  getTrainsonRoutes(res, mysql, context, complete);
  getRouteStations(res, mysql, context, complete);
  // getRouteID(res, mysql, context, complete);

// console.log(context);
  function complete() {
    callbackCount++;
    if (callbackCount >= 4) {
      console.log(context)

      res.render('routes', context);
      // res.status(200).send("success");
    }
  }
});

// -------------------------------------------------------------------------------------------//






//Inserts one entry into Stations entity
app.post('/stations/create', function (req, res, next) {

var station_name = req.body.station_name_input;
var station_address = req.body.station_address_input;
var station_state = req.body.station_state_input;
var station_city = req.body.station_city_input;
var station_zipcode = req.body.station_zipcode_input;

var query = "INSERT INTO Stations (stationname, address, state, city, zipcode) VALUES (?,?,?,?,?)";
mysql.pool.query(query, [station_name, station_address, station_state, station_city, station_zipcode], function (error, results, fields) {
  if (error) {
    res.status(400).send({});
  } else {
    res.status(200).send({});
  }
});

});

//Inserts one entry into Trains entity
app.post('/trains/create', function (req, res, next) {
    var station_id = req.body.station_id_input;
    var train_model = req.body.train_model_input;
    var train_cost = req.body.train_cost_input;
    var train_capacity = req.body.train_capacity_input;
    var train_first = req.body.train_first_input;
    var train_last = req.body.train_last_input;

    var query = "INSERT INTO Trains (stationID, model, cost, capacity, conductorfirstname, conductorlastname) VALUES (?,?,?,?,?,?)";
    mysql.pool.query(query, [station_id, train_model, train_cost, train_capacity, train_first, train_last], function (error, results, fields) {
      if (error) {
        res.status(400).send({});
      } else {
        res.status(200).send({});
      }

    });

});

//Inserts one entry into Routes entity
app.post('/routes/create', function (req, res, next) {
  var route_name = req.body.route_name;
  var train_on_route = req.body.train_on_route;
  var ticket_price = req.body.ticket_price

  var query = "INSERT INTO Routes (trainID, routename, ticketprice) VALUES (?,?,?)";
  mysql.pool.query(query, [train_on_route, route_name, ticket_price], function (error, results, fields) {
    if (error) {
      res.status(400).send({});
    } else {
      res.status(200).send({});
    }
  });
});




//Inserts one entry into RoutesThruStations entity
app.post('/routesthrustations/create', function (req, res, next) {
    var route = req.body.route;
    var station = req.body.station;
    var travel_duration = req.body.travel_duration;
    var miles_traveled = req.body.miles_traveled;
    var query = "INSERT INTO RoutesThruStations (routeID, stationID, travelduration, milestraveled) VALUES (?,?,?,?)";
    mysql.pool.query(query, [route, station, travel_duration, miles_traveled], function (error, results, fields) {
      if (error) {
        res.status(400).send({});
      } else {
        res.status(200).send("Successfully added stations to routesthrustations in database");
      }
    });
});


//Updates one of the entries in the Trains entity
app.post('/trains/update', function (req, res, next) {
  if (req.body && req.body.train_id && req.body.train_model && req.body.train_cost && req.body.train_capacity && req.body.train_first && req.body.train_last) {
      var train_id = req.body.train_id;
      var main_station = req.body.main_station;
      var train_model = req.body.train_model;
      var train_cost = req.body.train_cost;
      var train_capacity = req.body.train_capacity;
      var train_first = req.body.train_first;
      var train_last = req.body.train_last;

      var query = "UPDATE Trains SET stationID =?, model =?, cost =?, capacity =?, conductorfirstname =?, conductorlastname =? WHERE trainID=?";

      mysql.pool.query(query, [main_station, train_model, train_cost, train_capacity, train_first, train_last, train_id], function (error, results, fields) {
        if (error) {
          res.status(400).send({})
        } else {
          res.status(200).send("Successfully updated train entity!");
        }
      });
  } else {
    res.status(400).send({});
  }
});


//Deletes one entry in the Routes entity
app.post('/routes/delete', function (req, res, next) {
  if (req.body.route_id) {
    var query = "DELETE FROM Routes WHERE routeID=?";
    mysql.pool.query(query, [req.body.route_id], function (error, results, fields) {
      if (error) {
        res.status(400).send({});
      } else {
        res.status(200).send("Successfully deleted routes entity");
      }
    });
  } else {
    res.status(400).send({});
  }
});

//Deletes one entry in the RoutesThruStations entity
app.post('/routesthrustations/delete', function (req, res, next) {
  if (req.body.rts_id) {
    var query = "DELETE FROM RoutesThruStations WHERE routesthrustationsID=?";
    mysql.pool.query(query, [req.body.rts_id], function (error, results, fields) {
      if (error) {
        res.status(400).send({});
      } else {
        res.status(200).send("Successfully deleted routesthrustations entity.");
      }

    });
  } else {
    res.status(400).send({});
  }
});

//Deletes one entry in the Stations entity
app.post('/stations/delete', function (req, res, next) {
  if (req.body.station_id) {
    var query = "DELETE FROM Stations WHERE stationID=?";
    mysql.pool.query(query, [req.body.station_id], function (error, results, fields) {
      if (error) {
        res.status(400).send({});
      } else {
        res.status(200).send("Successfully deleted stations entity.");
      }
    });
  } else {
    res.status(400).send({});
  }
});


//Catches all other paths
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});


app.use(function (err, req, res, next) {
  res.status(500);
  res.render('500');
});



app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
