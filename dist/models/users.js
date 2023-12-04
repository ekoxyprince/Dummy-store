"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../utilities/database");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    sequelize: database_1.sequelize
});
