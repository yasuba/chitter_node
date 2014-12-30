var userHelper = require('./user_helper.js');

describe('a user signing up', function(){
  before(function(){
    casper.start('http://localhost:3000/users/new');
  });

  it('can create a new account', function(){
    casper.then(function(){
      // console.log(casper.getCurrentUrl());
      // casper.debugPage()
      casper.fill('form[action="/users"]', {
        username: "Bob",
        password: "password"
      }, true)
    });
    casper.then(function(){
      expect('h3').to.include.text('Hello Bob');
    });
  });

  it('must have a unique username', function(){
    casper.click('.sign-out');
    casper.thenOpen('http://localhost:3000/users/new', function(){
      casper.fill('form[action="/users"]', {
      username: "Bob",
      password: "password"
    }, true)
    });
    casper.then(function(){
      expect('.alert').to.include.text('That username has already been taken.');
    });
  });

});

describe('user signs in', function(){
  before(function(){
    casper.start('http://localhost:3000/sessions/new');
  });

  it('with incorrect credentials', function(){
    // casper.then(function(){
    //   this.click('.sign-out');
    //   casper.waitForUrl('http://localhost:3000/sessions/delete', function(){
    //     this.click('.sign-in');
    //   });
    // });
    userHelper('Bob', 'wrong');
    casper.then(function(){
      expect('h3').not.to.include.text('Hello Bob');
    });
  });

  it('with correct credentials', function(){
    casper.then(function(){
      userHelper('Bob', 'password');
    });
    casper.then(function(){
      expect('h3').to.include.text('Hello Bob');
    });
  });

});

describe('a signed-in user', function(){
  before(function(){
    casper.start('http://localhost:3000/');
    casper.click('.sign-out');
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