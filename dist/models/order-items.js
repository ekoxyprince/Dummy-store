"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utilities/database");
class OrderItem extends sequelize_1.Model {
}
exports.default = OrderItem;
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'order_items',
    sequelize: database_1.sequelize
});
