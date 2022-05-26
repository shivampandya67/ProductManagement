const express = require('express');
const passportJwt = require('passport-jwt');
const { ExtractJwt, Strategy } = passportJwt;
const passport = require('passport');
const { JWT_SECRET_KEY } = require('../constants/Index');
const Boom = require('boom');

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY.SECRET_KEY
};

try {
    passport.use(new Strategy(option, (payload, done) => {
        done(null, payload);
    })
    );
} catch (err) {
    console.log('Invalid token');
}


const authentication = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) { return next(err); }
        if (!user) {
            return next(Boom.badRequest('Token expired!'));
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = { authentication };