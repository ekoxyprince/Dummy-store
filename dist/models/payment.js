"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utilities/database");
class Payment extends sequelize_1.Model {
}
exports.default = Payment;
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstDetail: sequelize_1.DataTypes.STRING,
    secondDetail: sequelize_1.DataTypes.STRING,
    thirdDetail: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'payments',
    sequelize: database_1.sequelize
});
