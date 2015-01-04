var config = module.exports = {};

config.env = 'deveopment';
config.hostname = 'http://localhost:5432';

//postgres database
config.postgres = {};
config.postgres.uri = process.env.POSTGRES_URI || 'localhost';
config.db = 'chittern_development';