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

describe('clicking on peep usernames', function(){
  before(function(){
    casper.start('http://localhost:3000');
  });

  it('should link to a list of peeps posted by the user who owns that peep', function(){
    casper.then(function(){
      casper.click('.username');
    });
    casper.then(function(){
      expect('body').to.include.text("Hello world! Here's my Peep.");
    });
  });

});

describe('clicking on peeps', function(){
  before(function(){
    casper.start('http://localhost:3000');
  });

  it('should allow a user to write a comment', function(){
    casper.then(function(){
      casper.thenOpen('http://localhost:3000/sessions/new');
      userHelper('Bob', 'password');
    });
    casper.then(function(){
      casper.click('.peep');
      expect('body').to.include.text("Write a comment.");
    });
  });

  it('should allow user to send their comment to another user', function(){
    casper.then(function(){
      casper.fill('form[class="send-message"]', {
      comment: "Hello Maya, how's it going?"
      }, true)
    });
    casper.then(function(){
      expect('body').to.include.text("Hello Maya, how's it going?");
    });
  });

  it("should only display comments on the recipient's page", function(){
    casper.thenOpen('http://localhost:3000',function(){
    });
    casper.then(function(){
      expect('body').not.to.include.text("Hello Maya, how's it going?");
    });
  });

});