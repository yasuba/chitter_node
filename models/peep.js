function Peep(client){
  this.client = client;
};

Peep.prototype.fetch = function(callback){
  this.client.query("SELECT * FROM peeps", callback);
};

Peep.prototype.save = function(content, username){
  this.client.query("INSERT INTO peeps(content, username, date_added) values($1, $2, CURRENT_TIMESTAMP)", [content, username])
};

module.exports = Peep;