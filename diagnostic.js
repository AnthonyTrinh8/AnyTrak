var express = require('express');
var mysql = require('./dbcon.js');
var path = require('path');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


/*
var bool = true;

app.get(`/`, function (req, res, next) {
  mysql.pool.query( function (err) {
    if (err) {
      return next(err)'';
    }
  });
  var tables = [
  "CREATE TABLE IF NOT EXISTS `trains` (" +
  "`trainID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT," +
  "`model` varchar(255) NOT NULL," +
  "`cost` int(11) NOT NULL," +
  "`capacity` int(11) NOT NULL," +
  "`conductor` varchar(11) NOT NULL);",

  "CREATE TABLE IF NOT EXISTS `stations` (" +
  "`stationID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT," +
  "`stationname` varchar(255) NOT NULL," +
  "`address` varchar(255) NOT NULL," +
  "`state` varchar(255) NOT NULL," +
  "`city` varchar(255) NOT NULL," +
  "`zipcode` int(11) NOT NULL,);",

  "CREATE TABLE IF NOT EXISTS `routes` (" +
  "`routeID` int(11) NOT NULL AUTO_INCREMENT," +
  "`trainID` int(11), DEFAULT NULL" +
  "FOREIGN KEY (trainID) REFERENCES trains(trainID)," +
  "PRIMARY KEY (routeID));",

  "CREATE TABLE IF NOT EXISTS `routesthrustations` (" +
  "`routesthrustationsID` int(11) NOT NULL AUTO_INCREMENT," +
  "`routeID` int(11)," +
  "`stationID` int(11)," +
  "`stoporder` int(11) NOT NULL," +
  "`travelduration` varchar(255) not NULL," +
  "FOREIGN KEY (routeID) REFERENCES routes(routeID)," +
  "FOREIGN KEY (stationID) REFERENCES stations(stationID)," +
  "PRIMARY KEY (routesthrustationsID));"
  ];

  var deleteTable = [
  "DROP TABLE IF EXISTS `routesthrustations`",
  "DROP TABLE IF EXISTS `routes`",
  "DROP TABLE IF EXISTS `trains`",
  "DROP TABLE IF EXISTS `stations`"
  ];

  var insert = [
  "INSERT INTO `trains` (`model`, `cost`, `capacity`, `conductor`) VALUES (\"Steinway\", 100000, 250, \"John Doe\")",
  "INSERT INTO `stations` (`stationname`, `address`, `city`, `state`, `zipcode`) VALUES (\"Maldurks\", \"0000 NE 60TH AVE\", \"Oregon\", \"Portland\", 97200)",
  "INSERT INTO `routes` (`routeID`) VALUES (5)",
  "INSERT INTO `routesthrustations` (`stoporder`, `travelduration`) VALUES (3, 50)"
  ];

});

*/


app.get('/home',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM trains', function(error, results, fields){
    res.render('home');
  });
});

app.get('/trains',function(req,response,next){
  var context = {};
  mysql.pool.query('SELECT * FROM trains', function(error, results, fields){
    response.render('trains', {data: results});
  });
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
