function Comment(client){
  this.client = client;
};

Comment.prototype.save = function(comment, peep_id, username, callback){
  this.client.query("INSERT INTO comments(comment, peep_id, username, date_added) values($1, $2, $3, CURRENT_TIMESTAMP)", [comment, peep_id, username], callback)
};

Comment.prototype.fetch = function(callback){
  this.client.query("SELECT * FROM comments", callback);
};

module.exports = Comment;