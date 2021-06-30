const server = require('express').Router();
const { Category } = require('../db.js');

const cors = require('cors')
server.use(cors());

server.get('/', (req, res) => {
  Category.findAll({
    include: {
      all: true
    }
  }).then((categories) => {
    res.status(200).json(categories)
  }).catch(error => {
    res.status(400).json(error)
  });
})


server.post('/', (req, res) => {
  const { name } = req.body;
  Category.create({
    name
  }).then((category) => {
    res.status(200).json(category);
  }).catch((error) => {
    res.status(400).json(error);
  })
})

module.exports = server;