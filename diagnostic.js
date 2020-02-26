var express = require('express');
var mysql = require('./dbcon.js');
var path = require('path');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

handlebars.handlebars.registerHelper('if_eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.get('/home',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM trains', function(error, results, fields){
    res.render('home');
  });
});

app.get('/stations', function(req, res, next) {
  mysql.pool.query('SELECT * FROM stations', function(error, results, fields){
    res.render('stations', {data: results});
  });
});

app.get('/trains',function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM trains', function(error, results, fields){
    res.render('trains', {data: results});
  });
});

app.get('/routes', function(req, res, next) {
  var context = {};
  mysql.pool.query('SELECT * FROM routes', function(error, results, fields) {
    if (error) {
      return next(err);
    } else {
      var context1 = results;
      mysql.pool.query('SELECT * FROM routesthrustations', function(error, results, fields) {
        if (error) {
          return next(err);
        } else {
          var context2 = results;
          res.render('routes', {data1: context1 , data2: context2});
        }
      });
    }
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
