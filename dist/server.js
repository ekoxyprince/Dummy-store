"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const http = __importStar(require("http"));
const app_1 = __importDefault(require("./app"));
const port = config_1.default.port;
const server = http.createServer(app_1.default);
const database_1 = require("./utilities/database");
const users_1 = __importDefault(require("./models/users"));
const products_1 = __importDefault(require("./models/products"));
const product_details_1 = __importDefault(require("./models/product-details"));
const orders_1 = __importDefault(require("./models/orders"));
const order_items_1 = __importDefault(require("./models/order-items"));
products_1.default.belongsTo(users_1.default);
users_1.default.hasMany(products_1.default);
products_1.default.hasMany(product_details_1.default);
product_details_1.default.belongsTo(products_1.default);
order_items_1.default.belongsTo(orders_1.default);
orders_1.default.hasMany(order_items_1.default);
(0, database_1.connectToDb)()
    .then(connected => {
    console.log('connected to database');
    return database_1.sequelize.sync();
})
    .then(synced => {
    return users_1.default.findByPk(1);
})
    .then(user => {
    if (!user) {
        users_1.default.create({
            email: 'admin@admin.com',
            username: 'admin',
            role: 'admin',
            password: '$2a$12$KVu4k0LbsB/jDsIXEZ3ZuOPiZaQEzyZZAamMBDBSC7M3lWAUCW4e6'
        });
        return true;
    }
})
    .then(created => {
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})
    .catch(error => {
    console.log(error);
});
