const { User } = require('./db');
// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport)  {
  
  passport.use(new LocalStrategy({
    usernameField: 'email',
    password: 'password'
  },
    function(email, password, cb) {
      return User.findOne({where:{email:email}})
      .then(user =>{
        if(!user) return cb(null,false);
        bcrypt.compare(password, user.password, (err, result) =>{
          if(err) throw err;
          if(result === true){
            return cb(null,user);
        }else{
            return cb(null,false);
        }
        })
      }).catch(err => console.log('Error: ', err))
    }
  ))
  
  passport.use( new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
  },
    function(jwtPayload, cb) {
      // console.log(jwtPayload)
      return User.findByPk(jwtPayload.user.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        })
    } 
  ));
}