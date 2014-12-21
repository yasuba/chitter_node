var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var conString = "pg://maya:Sakura1981@localhost:5432/chitter_node_development";
var client = new pg.Client(conString);
client.connect();

var Sequelize = require('sequelize')
, sequelize = new Sequelize('database_name', 'username', 'password', {
  dialect: 'postgres',
  port: 5432
})

sequelize
  .authenticate()
  .complete(function(err){
    if(!err) {
      console.log('Unable to connect to the database', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });

sequelize
  .sync({force: true})
  .complete(function(err){
    if(!!err) {
      console.log('An error occurred while creating the table: ', err)
    } else {
      console.log('It worked!')
    }
  });

app.use(require('express').static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request,response){
  response.render('index', {username: request.body.username});
})

app.get('/sessions/new', function(request,response){
  response.render('sessions/new')
})

app.post('/sessions', function(request, response){
  response.render('index', {username: request.body.username});
})

server.listen(3000, function(){
  console.log('Server listening on port 3000');
})

module.exports = server;