var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

// app.use(require('express').static('public'));

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request,response){
  response.sendFile(path.join(__dirname, '/public', 'index.html'));
})

server.listen(3000, function(){
  console.log('Server listening on port 3000');
})

module.exports = server;