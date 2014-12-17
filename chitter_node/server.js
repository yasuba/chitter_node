var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

app.use(require('express').static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request,response){
  response.render('index');
})

app.get('/sessions/new', function(request,response){
  response.render('sessions/new')
})



app.post('/sessions', function(request, response){
  console.log(request);
  response.render('index');
})

server.listen(3000, function(){
  console.log('Server listening on port 3000');
})

module.exports = server;