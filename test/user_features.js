var userHelper = require('./user_helper.js');

describe('user signs in', function(){
  before(function(){
    casper.start('http://localhost:3000/sessions/new');
  });

  it('with correct credentials', function(){
    casper.then(function(){
      userHelper('Bob', 'password');
    });
    casper.then(function(){
      expect('p').to.include.text('Hello Bob');
    });
  });

  it('with incorrect credentials', function(){
    casper.then(function(){
      this.click('.sign-out');
      casper.waitForUrl('http://localhost:3000/sessions/delete', function(){
        this.click('.sign-in');
      });
    });
    userHelper('Bob', 'wrong');
    casper.then(function(){
      expect('p').not.to.include.text('Hello Bob');
    });
  });

});

describe('a signed-in user', function(){
  before(function(){
    casper.start('http://localhost:3000/');
  });

  it('cannot sign in again', function(done){
    casper.then(function(){
      this.click('.sign-in');
    });
    userHelper('Bob', 'password');
    casper.then(function(){
      expect('.sign-in').not.to.be.inDOM;
    });
  });

  it('should be able to sign in after signing out', function(){
    casper.then(function(){
      this.click('.sign-out');
    });
    casper.then(function(){
      expect('.sign-in').to.be.inDOM;
    });
  });

});