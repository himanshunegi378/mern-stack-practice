const JwtStrategy = require('passport-jwt').strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const secretKey = require('../config/key').secretKey;

const opts = {};
opts._jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretKey = secretKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        user.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
    }))
};