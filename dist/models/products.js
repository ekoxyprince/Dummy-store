"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utilities/database");
class Product extends sequelize_1.Model {
}
exports.default = Product;
Product.init({
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
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
}, {
    tableName: "products",
    sequelize: database_1.sequelize
});
