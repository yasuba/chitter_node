var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//   , cfg = require('../config')
//   , conString = "pg://"+login+"localhost:5432/"+cfg.postgres.db;
var engine = require('ejs-locals');
var session = require('express-session');
var timeago = require('timeago');
var User = require('./models/user.js');
var Peep = require('./models/peep.js');

if(process.env.NODE_ENV === 'testing') {
  process.env.DATABASE_URL = "pg://maya:Sakura1981@localhost:5432/chittern_test";
} else {
  process.env.DATABASE_URL = "pg://maya:Sakura1981@localhost:5432/chittern_development";
};

var client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.use(require('express').static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'supersecret',
                  saveUninitialized: true,
                  resave: true}));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get('/', function(request,response){
  var peep = new Peep(client);
  peep.fetch(function(err, content){
    var peeps = content.rows;
    peeps.sort(compare);
    var user = request.session.user;
    response.render('index', {'user':user, 'peeps': peeps, 'timeago': timeago, 'params': request.params.name});
  });
});

app.get('/users/new', function(request,response){
  var userExist = 0;
  response.render('users/new', {'userExist': userExist});
});

app.get('/users/:name', function(request, response){
  var peep = new Peep(client);
  peep.sort(request.params.name, function(err, content){
    var params = request.params.name;
    var peeps = content.rows;
    peeps.sort(compare);
    response.render('index', {'user': request.session.user, 'peeps': peeps, 'timeago': timeago, 'params': params});
  });
});

app.post('/users', function(request, response){
  var user = new User(client);
  user.find(request.body.username, response, function(err, result){
    if(err) {
      return console.error('error running query', err)
    }
    if(result.rowCount !== 0) {
      var userExist = result;
      response.render('users/new', {'userExist': userExist});
      return;
    }
    user.save(request.body.username, request.body.password, function(err, data){
      request.session.user = {
        "username": request.body.username
      };
      response.writeHead(302, {
        'Location': '/'
      });
      response.end();
    });
  });
});

app.get('/sessions/new', function(request, response){
  var noUser = undefined;
  response.render('sessions/new', {'noUser': noUser});
});

app.post('/sessions', function(request, response){
  var user = new User(client);
  user.find(request.body.username, response, function(err, result){
    if(err) {
      return console.error('error running query', err);
    }
    if(result.rows[0]) {
      var salt = result.rows[0].salt;
      user.authenticate(request.body.password, salt);
      if(user.newHash === result.rows[0].password) {
          request.session.user = result.rows[0];
          response.writeHead(302, {
            'Location': '/'
          });
          response.end();
        } else {
          var noUser = 0;
          response.render('sessions/new', {'noUser': noUser});
        }
    } else {
      var noUser = 0;
      response.render('sessions/new', {'noUser': noUser});
    }
  });
});

app.post('/sessions/delete', function(request, response){
  var peep = new Peep(client);
  peep.fetch(function(err, content){
    var peeps = content.rows;
    peeps.sort(compare);
    request.session.user = undefined;
    response.writeHead(302, {
      'Location': '/'
    });
    response.end();
  });
});

app.post('/post-peep', function(request, response){
  var peep = new Peep(client);
  var user = request.session.user;
  peep.save(request.body.content, request.session.user.username);
  peep.fetch(function(err, content){
    if(err) {
      return console.error('error running query', err);
    }
    var peeps = content.rows;
    peeps.sort(compare);
    response.writeHead(302, {
      'Location': '/'
    });
    response.end();
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