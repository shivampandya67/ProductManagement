const Sequelize = require("sequelize");
const sequelize = require('../config/db/index');
const Model = Sequelize.Model;

class Product extends Model { }
Product.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.BIGINT,
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2)
    },
    description: {
        type: Sequelize.STRING(1050)
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
},
    {
        sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });

module.exports = Product;