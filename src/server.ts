import app from './app'
const knex = require('./database/knexfile');
require('dotenv-safe').config();
// require('dotenv').config();

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`App rodando no endereço http://localhost:${port} 🚀`);
});