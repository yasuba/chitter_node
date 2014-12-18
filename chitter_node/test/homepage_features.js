describe('homepage', function(){
  before(function(){
    casper.start('http://localhost:3000/');
  });

  it('has a title', function(){
    casper.then(function(){
      expect("h1").to.include.text("Chitter on Node.js");
    });
  });

  it('shows messages on the homepage', function(){
    casper.then(function(){
      expect("li").to.include.text("Maya is totes awesome FTW!!!11");
    });
  });

  it('can go to the sign up page from homepage', function(){
    casper.then(function(){
      this.click('.sign-up');
    })
    casper.then(function(){
      console.log('new location is ' + this.getCurrentUrl());
    });
  });

  it('does not greet a signed-out user', function(){
    casper.then(function(){
      expect('body').not.to.have.text('Hello bob');
    })
  });

  it('allows a user to sign up to the service', function(){
    casper.then(function(){
      casper.thenOpen('sessions/new', function(){
        'form[action="/sessions"]'.should.be.inDOM.and.be.visible
        casper.fill('form', {
          username: 'bob'
        }, true)
        casper.then(function(){
          expect('p').to.include.text('Hello bob');
        })
      });
    })
  });

});