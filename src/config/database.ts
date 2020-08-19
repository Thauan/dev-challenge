import knex from 'knex';
const config = require('../database/knexfile');

const db = knex(config);

export default db;

// require("dotenv/config");
// const config = require('../database/knexfile');
// var knex = require('knex')(config)

// module.exports = {

// };