const { DB } = require('../../constants/Index');
const sequelize = require('./index');
// import Product from '../../models/ProductModels';
// import User from '../../models/UserModels';

const init = async () => {
    /**
     * Do NOT change the sequence of forcefully sync, keep it after all relation defined
     * As we have implemented the migration, There is no longer need of sync the database through the sequelize
     */

    // User.hasMany(Product, { foreignKey: 'userId' });
    // Product.belongsTo(User, { foreignKey: 'userId' });
    try {
        if (DB.ALTER_CREATE) {
            await sequelize.sync({ alter: DB.ALTER_CREATE });
            console.log('Database synchronized');
        }
    } catch (error) {
        console.log('Relation error ', error);
    }
};

module.exports = { init };