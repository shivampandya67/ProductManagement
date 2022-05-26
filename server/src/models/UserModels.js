// import { Module } from 'module';
const Sequelize = require('sequelize');
// import { ModuleResolutionKind } from 'typescript';
const sequelize = require('../config/db/index');
const Model = Sequelize.Model;

class User extends Model {
}
User.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: Sequelize.STRING,
    },
    userEmail: {
        type: Sequelize.STRING,
    },
    userPassword: {
        type: Sequelize.STRING
    }
},
    {
        sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });

module.exports = User;