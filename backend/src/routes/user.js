const server = require('express').Router();
const passport = require('passport');
const bcrypt =require("bcrypt")
const jwt = require('jsonwebtoken');
const { User } = require('../db.js');
const cors = require('cors')
server.use(cors());
require('../passport-config')(passport)


// GET - All users
server.get('/', /*passport.authenticate('jwt', {session: false}),*/ (req, res) => {
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

// POST - Create User
server.post('/', (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  User.create({
    firstName,
    lastName,
    email,
    password,
  }).then((users) => {
    res.status(200).json(users);
  }).catch((error) => {
    console.error(error);
    res.status(400).send(error);
  })
});


module.exports = server;