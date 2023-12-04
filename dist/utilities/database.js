"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
exports.sequelize = new sequelize_1.Sequelize(config_1.default.database, config_1.default.user, config_1.default.password, {
    dialect: 'mysql',
    host: 'localhost'
});
const connectToDb = () => {
    return exports.sequelize.authenticate();
};
exports.connectToDb = connectToDb;
