require('dotenv').config();
const express = require('express');
const { conn } = require('./src/db')
// const sequelize = require('./db');
const routes = require('./src/routes/index.js');
const morgan = require('morgan');
const port = 3000;
require('./src/db.js');


const app = express();
app.use(express.json());
app.use(morgan('tiny'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
app.use('/', routes);

conn.sync({force: false}).then(() => {
  app.listen( port, () => {
    console.log('%s listening at 3000');
  })
})