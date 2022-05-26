const express = require('express');
const userService = require('../service/UserServices');

const Router = express.Router();
/*
*  Register User.
*/
Router.post('/register', [
    userService.validateRegisteredParameter,
    userService.validateDuplicateValues,
    userService.confirmPassword,
    userService.registerUser
]);


/*
* Login User.
*/
Router.post('/login', userService.signIn);

module.exports = Router;
