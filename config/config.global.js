var config = module.exports = {};

config.env = 'development';
config.hostname = 'http://localhost:3000';

//postgres database
config.postgres = {};
config.postgres.uri = process.env.POSTGRES_URI || 'localhost';
config.postgres.db = 'chittern_development';