const _ = require('lodash');
require('dotenv').config();

/**
 * Database variable
 */

const DB = {
    URL: process.env.DB_URL,
    NAME: process.env.DB_NAME,
    GET_USERNAME: process.env.DB_USERNAME,
    GET_PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    LOGGING: String(true) === process.env.DB_LOGGING,
    ALTER_CREATE: String(true) === process.env.ALTER_CREATE
};

const JWT_SECRET_KEY = {
    SECRET_KEY: process.env.SECRET_KEY
};

if (_.isEmpty(DB.URL)) {
    console.log('----------------------------------------------------------------------------------- ');
    console.log('ERROR :  Please export DatabaseUrl. ');
    console.log('----------------------------------------------------------------------------------- ');
    process.exit(1);
}

module.exports = { DB, JWT_SECRET_KEY };