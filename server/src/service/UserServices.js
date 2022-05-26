const express = require('express');
const User = require('../models/UserModels');
const Boom = require('boom');
const _ = require('lodash');
const { JWT_SECRET_KEY } = require('../constants/Index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const validateRegisteredParameter = async (req, res, next) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (_.isNumber(username)) {
        return next(Boom.badRequest('Name can not be a Number.'));
    }

    if (username === '' || email === '') {
        return next(Boom.badRequest('username or email cant contain an empty string!'));
    }
    if (password === '' || confirmPassword === '') {
        return next(Boom.badRequest('password or confirm password cant contain an empty string!'));
    }

    if (_.isUndefined(username)) {
        return next(Boom.badRequest('Please enter username'));
    } else if (_.isUndefined(email)) {
        return next(Boom.badRequest('Please enter email'));
    } else if (_.isUndefined(password)) {
        return next(Boom.badRequest('Please enter password'));
    } else if (_.isUndefined(confirmPassword)) {
        return next(Boom.badRequest('Please enter Confirm password'));
    }

    if (_.isNull(username)) {
        return next(Boom.badRequest('Username should not be null'));
    } else if (_.isNull(email)) {
        return next(Boom.badRequest('Email should not be null'));
    } else if (!email.match(mailFormat)) {
        return next(Boom.badRequest('Email input is invalid'));
    } else if (_.isNull(password)) {
        return next(Boom.badRequest('Password should not be null'));
    } else if (_.isNull(confirmPassword)) {
        return next(Boom.badRequest('confirm password should not be null'));
    }
    next();
};

const validateDuplicateValues = async (req, _, next) => {

    const findEmail = await User.findOne({ where: { userEmail: req.body.email } });

    if (findEmail) {
        return next(Boom.badRequest('Please enter valid email address.'));
    }
    next();
};


const confirmPassword = async (req, _, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        return next(Boom.badRequest('Confirm password is not matching with password'));
    }
    next();
};


/*
* Register User by storing the data in the database
*/
const registerUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const data = await User.create({
            userName: username,
            userEmail: email,
            userPassword: bcrypt.hashSync(password, 8)
        });
        res.json({ data, message: 'User Created Successfully' });
    }
    catch (err) {
        return next(err);
    }
};

/*
* SignIn with token generation.
*/
const signIn = async (req, res, next) => {
    try {

        if (req.body.email === '' || req.body.password === '') {
            return res.status(400).send('Email or password can\'t be null');
        }

        const userData = await User.findOne({ where: { userEmail: req.body.email } });

        if (!userData) {
            return res.status(400).send('User with this email is not registered!');
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, userData.userPassword);

        if (!passwordIsValid) {
            return res.status(400).send('Invalid Credentials');
        }
        const token = jwt.sign({ id: userData.id, email: userData.userEmail }, JWT_SECRET_KEY.SECRET_KEY, {
            expiresIn: 3600 // 30 minutes
        });
        res.status(200).send({
            id: userData.id,
            username: userData.userName,
            email: userData.userEmail,
            accessToken: token
        });

    }
    catch (err) {
        res.json({ message: 'Something went wrong while signing in.' });
    }
};

module.exports = {
    validateRegisteredParameter,
    validateDuplicateValues,
    confirmPassword,
    registerUser,
    signIn
};