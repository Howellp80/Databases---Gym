var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 22222);

app.get('/',function(req,res){
  console.log("Home Page accessed");
  res.render('home'); 
});


//************************************************************************
// Memberships
//************************************************************************
app.get('/memberships',function(req,res){

  console.log("Memberships clicked");
  res.render('memberships'); 
});


app.get('/fetchMS', function(req, res) {
   var context = {};
   mysql.pool.query('SELECT * FROM membership', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      console.log("sending fetchMS");
      res.send(context.results);
   });
});


app.post('/addMS', function(req, res) {
   var newRow = {};
      newRow.id = "NULL";
      newRow.type = req.body.msType;

   var context = {};

   mysql.pool.query('INSERT INTO membership SET ?', newRow, function(err, results) {
      if (err) {
         //console.log("Error at .get '/'");
         next(err);
         return;
      }
      mysql.pool.query('SELECT * FROM membership', function(err, rows, fields) {
         if (err) {
            next(err);
            return;
         }
         context.results = JSON.stringify(rows);
         res.send(context.results);
      });
   });
});




//************************************************************************
// Members
//************************************************************************
app.get('/members',function(req,res){
  console.log("Members clicked");
  var context = {};
   mysql.pool.query('SELECT * FROM membership', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.membships = rows;

      res.render('members', context); 
//      }); 
   });
});


app.get('/fetchM', function(req, res) {
   var context = {};
   mysql.pool.query('SELECT m.id, m.f_name, m.l_name, ms.id AS msid, ms.type FROM `member` m INNER JOIN `membership` ms ON m.msid = ms.id;', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      res.send(context.results);
   });
});


app.post('/addM', function(req, res) {
   var newRow = {};
      newRow.id = "NULL";
      newRow.f_name = req.body.fname;
      newRow.l_name = req.body.lname;
      newRow.msid = req.body.msid;

   var context = {};

   mysql.pool.query('INSERT INTO member SET ?', newRow, function(err, results) {
      if (err) {
         next(err);
         return;
      }
      mysql.pool.query('SELECT m.id, m.f_name, m.l_name, ms.id AS msid, ms.type FROM `member` m INNER JOIN `membership` ms ON m.msid = ms.id;', function(err, rows, fields) {
         if (err) {
            next(err);
            return;
         }
         context.results = JSON.stringify(rows);
         res.send(context.results);
      });
   });
});




//************************************************************************
// Routines
//************************************************************************
app.get('/routines',function(req,res){

  console.log("Routines clicked");
  var context = {};
   mysql.pool.query('SELECT m.id, m.f_name, m.l_name FROM `member` m INNER JOIN `membership` ms ON m.msid = ms.id WHERE ms.id > 1', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.memb = rows;
      res.render('routines', context); 
   });

});


app.get('/fetchR', function(req, res) {
   var context = {};
   mysql.pool.query('SELECT r.id, r.name, m.id AS mid, m.f_name, m.l_name FROM `member` m INNER JOIN `routine` r ON r.mid = m.id', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      res.send(context.results);
   });
});


app.post('/addR', function(req, res) {
   var newRow = {};
      newRow.id = "NULL";
      newRow.name = req.body.rName;
      newRow.mid = req.body.mid;

   var context = {};

   mysql.pool.query('INSERT INTO routine SET ?', newRow, function(err, results) {
      if (err) {
         next(err);
         return;
      }
      mysql.pool.query('SELECT r.id, r.name, m.id AS mid, m.f_name, m.l_name FROM `member` m INNER JOIN `routine` r ON r.mid = m.id', function(err, rows, fields) {
         if (err) {
            next(err);
            return;
         }
         context.results = JSON.stringify(rows);
         res.send(context.results);
      });
   });
});




//************************************************************************
// Exercises
//************************************************************************
app.get('/exercises',function(req,res){

  console.log("Exercises clicked");
  res.render('exercises'); 
});


app.get('/fetchE', function(req, res) {
   var context = {};
   mysql.pool.query('SELECT * FROM exercise', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      res.send(context.results);
   });
});


app.post('/addE', function(req, res) {
   var newRow = {};
      newRow.id = "NULL";
      newRow.name = req.body.eName;
      newRow.sets = req.body.eSets;
      newRow.reps = req.body.eReps;

   var context = {};

   mysql.pool.query('INSERT INTO exercise SET ?', newRow, function(err, results) {
      if (err) {
         next(err);
         return;
      }
      mysql.pool.query('SELECT * FROM exercise', function(err, rows, fields) {
         if (err) {
            next(err);
            return;
         }
         context.results = JSON.stringify(rows);
         res.send(context.results);
      });
   });
});





//************************************************************************
// Member / Exercises
//************************************************************************
app.get('/membexer',function(req,res){
  console.log("MembExer Page accessed");
  var context = {};
   mysql.pool.query('SELECT * FROM member', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.memb = rows;

      mysql.pool.query('SELECT * FROM exercise', function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        context.exer = rows;

        res.render('membexer', context); 
        }); 

   });
});


app.get('/fetchME', function(req, res) {
   var context = {};
   mysql.pool.query('SELECT m.f_name, m.l_name, e.name FROM `member` m INNER JOIN `memb_exer` me ON m.id = me.mid INNER JOIN `exercise` e ON me.eid = e.id;', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      res.send(context.results);
   });
});


app.post('/addME', function(req, res) {
   var newRow = {};
      newRow.mid = req.body.mid;
      newRow.eid = req.body.eid;

   var context = {};

   mysql.pool.query('INSERT INTO memb_exer SET ?', newRow, function(err, results) {
      if (err) {
         next(err);
         return;
      }
      mysql.pool.query('SELECT m.f_name, m.l_name, e.name FROM `member` m INNER JOIN `memb_exer` me ON m.id = me.mid INNER JOIN `exercise` e ON me.eid = e.id;', function(err, rows, fields) {
         if (err) {
            next(err);
            return;
         }
         context.results = JSON.stringify(rows);
         res.send(context.results);
      });
   });
});





//************************************************************************
// Routine / Exercises
//************************************************************************
app.get('/routexer',function(req,res){
  console.log("RoutExer Page accessed");
  var context = {};
   mysql.pool.query('SELECT * FROM routine', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.rout = rows;

      mysql.pool.query('SELECT * FROM exercise', function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        context.exer = rows;

        res.render('routexer', context); 
        }); 

   });
});


app.get('/fetchRE', function(req, res) {
   var context = {};
   mysql.pool.query('SELECT r.name, e.name AS ename FROM `routine` r INNER JOIN `rout_exer` re ON r.id = re.rid INNER JOIN `exercise` e ON re.eid = e.id', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      res.send(context.results);
   });
});


app.post('/addRE', function(req, res) {
   var newRow = {};
      newRow.rid = req.body.rid;
      newRow.eid = req.body.eid;

   var context = {};

   mysql.pool.query('INSERT INTO rout_exer SET ?', newRow, function(err, results) {
      if (err) {
         next(err);
         return;
      }
      mysql.pool.query('SELECT r.name, e.name AS ename FROM `routine` r INNER JOIN `rout_exer` re ON r.id = re.rid INNER JOIN `exercise` e ON re.eid = e.id', function(err, rows, fields) {
         if (err) {
            next(err);
            return;
         }
         context.results = JSON.stringify(rows);
         res.send(context.results);
      });
   });
});




//************************************************************************
// Search
//************************************************************************
app.get('/search',function(req,res){
  console.log("Search Page accessed");
  var context = {};
   mysql.pool.query('SELECT id, f_name, l_name FROM member', function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.membs = rows;

      res.render('search', context); 

   });
});


app.post('/fetchSL', function(req, res) {
   var context = {};
   //console.log([req.body.id]);
   mysql.pool.query('SELECT r.name FROM `routine` r INNER JOIN `member` m ON r.mid = m.id WHERE m.id = ?', [req.body.id], function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      //console.log("From FetchSL:");
      //console.log(context.results);

      res.send(context.results);
   });
});


app.post('/fetchSR', function(req, res) {
   var context = {};
   //console.log([req.body.id]);
   mysql.pool.query('SELECT e.name FROM `exercise` e INNER JOIN `memb_exer` me ON e.id = me.eid INNER JOIN `member` m ON me.mid = m.id WHERE m.id=?', [req.body.id], function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      context.results = JSON.stringify(rows);
      //console.log("From FetchSR:");
      //console.log(context.results);

      res.send(context.results);
   });
});





//************************************************************************
// Edit
//************************************************************************
app.get('/edit', function(req, res, next) {
   var context = {};
   mysql.pool.query('SELECT * FROM exercise WHERE id=?', [req.query.id], function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      //console.log(rows[0]);
      context.result = rows[0];
      res.render('edit', context);
   });
});


app.post('/edit', function(req, res, next) {
   var context = {};
   mysql.pool.query('SELECT * FROM exercise WHERE id=?', [req.body.id], function(err, result) {
      if (err) {
         next(err);
         return;
      }
      if (result.length == 1) {
         var curVals = result[0];
         var useLbs;
         if(req.body.lbs){
            useLbs = 1;
         } else {
            useLbs = 0;
         }
         //console.log(JSON.stringify(req.body));
         mysql.pool.query('UPDATE exercise SET name=?, sets=?, reps=? WHERE id=?', [req.body.name || curVals.name, req.body.sets || curVals.sets, req.body.reps || curVals.reps, req.body.id],
            function(err, result) {
               if (err) {
                  next(err);
                  return;
               }
               context.results = JSON.stringify(result);
               res.send(context.results);
            });
      }
   });
});



//************************************************************************
// Error and Listen
//************************************************************************
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
