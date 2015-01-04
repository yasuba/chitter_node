var config = require('./config.global');

config.env = 'testing';
config.hostname = 'http://localhost:5432';
config.postgres.db = 'chittern_test';

module.exports = config;