var User = sequelize.define('User',{
  username: Sequelize.STRING,
  password: Sequelize.STRING
  }, {
    tableName: 'users',
});

user
  .save()
  .complete(function(err){
    if(!!err) {
      console.log('The instance has not been saved: ', err)
    } else {
      console.log('We have a persisted instance now')
    }
  })