"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utilities/database");
class ProductDetail extends sequelize_1.Model {
}
exports.default = ProductDetail;
ProductDetail.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'product_details',
    sequelize: database_1.sequelize
});
