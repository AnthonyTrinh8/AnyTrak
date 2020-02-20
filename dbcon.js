var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_trinhan',
  password        : '7107',
  database        : 'cs340_trinhan'
});

module.exports.pool = pool;
