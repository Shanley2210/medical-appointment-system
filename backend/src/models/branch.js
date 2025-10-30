'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Branch.hasMany(models.User, {
                foreignKey: 'branchId',
                as: 'users'
            });
        }
    }
    Branch.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Branch'
        }
    );
    return Branch;
};
