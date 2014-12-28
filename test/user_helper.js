module.exports = function(username, password){
  casper.then(function(){
    casper.fill('form', {
      username: username,
      password: password
    }, true)
  });
};