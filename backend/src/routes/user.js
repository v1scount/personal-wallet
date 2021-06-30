const server = require('express').Router();
const { User } = require('../db.js');

const cors = require('cors')
server.use(cors());


server.get('/', (req, res) => {
  User.findAll({
    include: {
      all: true
    }
  }).then((users) => {
    res.status(200).json(users)
  }).catch((error) => {
    console.log(error);
    res.status(400).send(error)
  });
});

server.post('/', (req, res) => {
  const {firstName, lastName, email, password, CategoryId, UserId} = req.body;
  User.create({
    firstName,
    lastName,
    email,
    password,
    CategoryId,
    UserId,
  }).then((users) => {
    res.status(200).json(users);
  }).catch((error) => {
    console.error(error);
    res.status(400).send(error);
  })
});

module.exports = server;