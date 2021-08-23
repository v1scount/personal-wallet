const server = require('express').Router();
const { Category } = require('../db.js');
const passport = require('passport');

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

// POST - New category
server.post('/', (req, res) => {
  const { name, type } = req.body;
  Category.create({
    name,
    type
  }).then((category) => {
    res.status(200).json(category);
  }).catch((error) => {
    res.status(400).json(error);
  })
});

// GET - Incomes

server.get('/incomes', passport.authenticate("jwt",{session:false}), (req, res) => {
  Category.findAll({
    where: {
      type: 'Income'
    }
  }).then((categories) => {
    res.status(200).json(categories);
  }).catch((e) => {
    res.status(400).json(error);
  })
});

// GET - Outcomes

server.get('/outcomes', passport.authenticate("jwt",{session:false}), (req, res) => {
  Category.findAll({
    where: {
      type: 'Outcome'
    }
  }).then((categories) => {
    res.status(200).json(categories);
  }).catch((e) => {
    res.status(400).json(error);
  })
})

module.exports = server;