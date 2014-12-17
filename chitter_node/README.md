#Chitter on Node.js

I'm trying to create another Twitter clone that will allow the users to post messages to a public stream. But this time I am using Node.js.

Features:

+ In order to use chitter as a maker I want to sign up to the service
+ In order to user chitter as a maker I want to log in
+ In order to avoid others to use my account as a maker I want to log out
+ In order to let people know what I am doing as a maker I want to post a message to chitter
+ In order to see what people have to say as a maker I want to see all peeps in chronological order

Notes:
+ Makers sign up to chitter with their email, password, name and a user name (i.e. maya@test.com, s3cr3t, Maya Driver, yasuba)
+ The username and email are unique
+ Peeps (posts to chitter) have the name of the maker and their user handle
+ Use bcrypt to secure the passwords
+ Use data mapper and postgres to save the data
+ You don't have to be logged in to see the peeps
+ You only can peep if you are logged in.
+ Bonus: If you have time you can implement the following: Work on the css to make it look good (we all like beautiful things).

##Technologies

* Javascript
* Node.js
* Express
* EJS
* Grunt

 For testing:
* Casperjs
* Mocha
* Chai
* Phantomjs
* Casper-Chai
* Mocha-casperjs
* Grunt-mocha-casperjs
