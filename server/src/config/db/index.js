const Sequelize = require('sequelize');
const { DB } = require('../../constants/Index');

/**
* Database connection using sequelize
*/
const sequelize = new Sequelize(DB.NAME, DB.GET_USERNAME, DB.GET_PASSWORD, {
    dialect: "mysql",
    logging: false,
    port: 3306,
    host: DB.HOST,
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.log('Unable to connect to the database:%o', err);
});

module.exports = sequelize;