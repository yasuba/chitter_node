var userHelper = require('./user_helper.js');

describe('posting a peep', function(){
  before(function(){
    casper.start('http://localhost:3000');
  });

  after(function(){
    casper.thenOpen('http://localhost:3000/',function(){
      casper.click('.sign-out');
    });
  });

  it('should display the peep once it is posted', function(){
    casper.then(function(){
      casper.click('.sign-in');
      casper.waitForUrl('http://localhost:3000/sessions/new', function(){
        userHelper('Bob', 'password');
      });
    });
    casper.then(function(){
      casper.fill('form[action="/post-peep"]', {
        content: "Hello world! Here's my Peep."
      }, true)
    });
    casper.then(function(){
      expect('li').to.include.text("Hello world! Here's my Peep.");
    });
  });

});