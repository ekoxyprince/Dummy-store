"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utilities/database");
class Order extends sequelize_1.Model {
}
exports.default = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    orderNo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'orders',
    sequelize: database_1.sequelize
});
