var bcrypt = require('bcrypt');

function User(client){
  this.client = client;
  this.salt = bcrypt.genSaltSync(10);
};

User.prototype.save = function(username, password, callback){
  var hash = bcrypt.hashSync(password, this.salt);
  this.client.query("INSERT INTO users(username, password, salt) values($1, $2, $3)", [username, hash, this.salt], callback)
};

User.prototype.findByName = function(username, response, callback){
  this.client.query("SELECT * FROM users WHERE username=$1", [username], callback)
};

User.prototype.authenticate = function(password, salt){
  this.newHash = bcrypt.hashSync(password, salt);
};

module.exports = User;