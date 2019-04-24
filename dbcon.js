var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_howellp',
  password        : 'Wolfpack',
  database        : 'cs340_howellp'
});

module.exports.pool = pool;
