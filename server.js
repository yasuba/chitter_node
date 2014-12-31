var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var engine = require('ejs-locals');
var session = require('express-session');

if(process.env.NODE_ENV === 'testing') {
  var conString = "pg://maya:Sakura1981@localhost:5432/chittern_test";
} else {
  var conString = "pg://maya:Sakura1981@localhost:5432/chittern_development";
}

var client = new pg.Client(conString);
client.connect();

app.use(require('express').static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'supersecret'}));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get('/', function(request,response){
  client.query("SELECT * FROM peeps", function(err, content){
    var peeps = content.rows;
    peeps.sort(compare);
    var user = request.session.user;
    response.render('index', {'user':user, 'peeps': peeps});
  });
});

app.get('/users/new', function(request,response){
  var userExist = 0;
  response.render('users/new', {'userExist': userExist});
});

app.post('/users', function(request, response){
  client.query("SELECT * FROM users WHERE username=$1", [request.body.username], function(err, result){
    if(err) {
      return console.error('error running query', err)
    }
    if(result.rowCount !== 0) {
      var userExist = result
      response.render('users/new', {'userExist': userExist});
    }
    client.query("INSERT INTO users(username, password) values($1, $2)", [request.body.username, request.body.password]);
    client.query("SELECT * FROM peeps", function(err, content){
      if(err) {
        return console.error('error running query', err)
      }
      var peeps = content.rows;
      peeps.sort(compare);
      client.query("SELECT * FROM users WHERE username=$1 and password=$2", [request.body.username, request.body.password], function(err,result){
        if(err) {
          return console.error('error running query', err)
        }
        request.session.user = result.rows[0];
        response.render('index', {'user':request.session.user, 'peeps': peeps});
      });
    });
  });
});

app.get('/sessions/new', function(request, response){
  var noUser = undefined;
  response.render('sessions/new', {'noUser': noUser});
});

app.post('/sessions', function(request, response){
  client.query("SELECT * FROM peeps", function(err, content){
    if(err) {
      return console.error('error running query', err)
    }
    var peeps = content.rows;
    peeps.sort(compare);
    client.query("SELECT * FROM users WHERE username=$1 and password=$2", [request.body.username, request.body.password], function(err,result){
      if(err) {
        return console.error('error running query', err);
      }
      if(result.rows[0]) {
        request.session.user = result.rows[0];
        response.render('index', {'user':request.session.user, 'peeps': peeps});
      }
      else {
        var noUser = 0;
        response.render('sessions/new', {'noUser': noUser});
      }
    });
  });
});

app.post('/sessions/delete', function(request, response){
  client.query("SELECT * FROM peeps", function(err, content){
    var peeps = content.rows;
    peeps.sort(compare);
    request.session.user = undefined;
    response.render('index', {'user':request.session.user, 'peeps': peeps});
  });
});

app.post('/post-peep', function(request, response){
  var user = request.session.user;
  client.query("INSERT INTO peeps(content, username, date_added) values($1, $2, CURRENT_TIMESTAMP)", [request.body.content, request.session.user.username]);
  client.query("SELECT * FROM peeps", function(err, content){
    if(err) {
      return console.error('error running query', err);
    }
    var peeps = content.rows;
    peeps.sort(compare);
    response.render('index', {'user': user, 'peeps': peeps});
  });
});

function compare(a,b){
  if (a.date_added > b.date_added){
    return -1;
  }
  if (a.date_added < b. date_added){
    return 1;
  }
  return 0;
};

server.listen(3000, function(){
  console.log('Server listening on port 3000');
});

module.exports = server;