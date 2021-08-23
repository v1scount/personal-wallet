const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User');
const server = require('express').Router();
const bcrypt =require("bcrypt")
const jwt = require('jsonwebtoken');
const { User } = require('../db.js');
const cors = require('cors')
server.use(cors());
require('../passport-config')(passport)


server.post('/', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info)   => {
    if(err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    
    req.login(user, {session: false}, (err) => {
      if(err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response

      const token = jwt.sign({user}, process.env.TOKEN_SECRET);
      res.set('Authorization',`Bearer ${token}`);
      // console.log(res.header.Authorization)
      return res.json({user, token})
    })
  })(req, res);
})

module.exports = server;