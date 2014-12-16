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

  it('allows a user to sign up to the service', function(){
    casper.then(function(){

    });
  });

});