#Chitter on Node.js

I'm trying to create another Twitter clone that will allow the users to post messages to a public stream. But this time I am using Node.js.

Features:

+ In order to use chitter I want to sign up to the service
+ In order to user chitter I want to log in
+ In order to avoid others to use my account I want to log out
+ In order to let people know what I am doing I want to post a message to chitter
+ In order to see what people have to say I want to see all peeps in chronological order

Notes:
+ Makers sign up to chitter with their password and a user name (i.e. s3cr3t, yasuba)
+ The username is unique
+ Peeps (posts to chitter) have the name of the user
+ Use bcrypt to secure the passwords
+ Use postgres to save the data
+ You don't have to be logged in to see the peeps
+ You only can peep if you are logged in.
+ Bonus: If you have time you can implement the following: Work on the css to make it look good (we all like beautiful things).

##Technologies

* Javascript
* Node.js
* Express
* EJS
* Grunt
* PostgreSQL

For testing:
* Casperjs
* Mocha
* Chai
* Phantomjs
* Casper-Chai
* Mocha-casperjs
* Grunt-mocha-casperjs

##Run the app

To run Chitter, first you must have Node.js installed. Next clone this repository, cd into it then npm install all the dependencies. Finally start the server and navigate to localhost port 3000.

    git clone git@github.com:yasuba/chitter_node.git
    cd chitter_node
    npm install
    node server.js

As I'm not using an ORM, I currently have not got a way to easily create and migrate databases, so if you want to run Chitter, you'll have to create your own! The database has the tables users, peeps and comments. (Obviously this is something I plan to work on).

###View the app online

Check it out here: https://chitter-node.herokuapp.com/
