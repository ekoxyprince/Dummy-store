"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../models/products"));
const trycatch_1 = __importDefault(require("../utilities/trycatch"));
const database_1 = require("../utilities/database");
const express_validator_1 = require("express-validator");
const payment_1 = __importDefault(require("../models/payment"));
const fs_1 = __importDefault(require("fs"));
const orders_1 = __importDefault(require("../models/orders"));
const order_items_1 = __importDefault(require("../models/order-items"));
const config_1 = __importDefault(require("../config"));
const mail_1 = __importDefault(require("../helpers/mail"));
exports.default = {
    dashboard: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield orders_1.default.findAll({ limit: 5, order: [['id', 'DESC']] });
        res.render('./admin/dashboard', {
            path: '/dashboard',
            orders: order,
            totalProduct: (yield products_1.default.findAll()).length,
            totalOrders: (yield orders_1.default.findAll()).length,
            revenue: (yield orders_1.default.findAll({
                where: { status: 'processed' },
                attributes: [
                    [database_1.sequelize.fn('SUM', database_1.sequelize.col('total')), 'totalSum']
                ]
            }))[0]['dataValues']['totalSum']
        });
    })),
    product: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let products = yield products_1.default.findAll();
        res.render('./admin/products', {
            products: products,
            path: '/products'
        });
    })),
    addProduct: (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, body: { status: "validation error", data: errors.array()[0] } });
        }
        const { name, price, description, category } = req.body;
        req.user.createProduct({
            name: name, category: category,
            price: price, description: description,
            image: (`${req.file.destination}${req.file.filename}`).slice(8)
        })
            .then((created) => {
            res.json({ success: true, body: { status: 'Product Created', data: created } });
        })
            .catch((error) => {
            console.log(error);
        });
    },
    deleteProduct: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const product = yield products_1.default.findByPk(id);
        const destroyedProduct = yield (product === null || product === void 0 ? void 0 : product.destroy());
        fs_1.default.unlink(`./public${destroyedProduct.image}`, (err) => {
            if (err)
                throw err;
            res.redirect('/admin/products');
        });
    })),
    addPayment: (req, res, next) => {
        const { name, category, first, second, third } = req.body;
        payment_1.default.create({
            name: name,
            firstDetail: first,
            secondDetail: second,
            thirdDetail: third,
            category: category
        })
            .then((payment) => {
            res.json({ success: true, body: { status: 'Payment Created', data: payment } });
        })
            .then(error => {
            console.log(error);
        });
    },
    removePayment: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const payment = yield payment_1.default.findByPk(id);
        const destroyedPayment = yield (payment === null || payment === void 0 ? void 0 : payment.destroy());
        res.redirect('/admin/payments');
    })),
    getPayment: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        res.render('./admin/payment', {
            payment: yield payment_1.default.findAll(),
            path: '/payments'
        });
    })),
    getOrders: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        res.render('./admin/orders', {
            orders: yield orders_1.default.findAll(),
            path: '/orders'
        });
    })),
    gerOrderDetails: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const order = yield orders_1.default.findOne({ include: order_items_1.default, where: { id: id } });
        res.render('./admin/orderdetails', {
            order: order,
            path: '/order_details'
        });
    })),
    updateOrder: (req, res, next) => {
        const { id } = req.body;
        orders_1.default.findByPk(id)
            .then((order) => {
            order.status = 'processed';
            return order === null || order === void 0 ? void 0 : order.save();
        })
            .then(order => {
            (0, mail_1.default)(order.email, `We have processed your order. The details for your order are below:<br>
            Order Number: <b>${order === null || order === void 0 ? void 0 : order.orderNo}</b> <br>
            fullname: <b>${order === null || order === void 0 ? void 0 : order.fullname}</b> <br>
            email: <b>${order === null || order === void 0 ? void 0 : order.email}</b> <br>
            delivery address: <b>${order === null || order === void 0 ? void 0 : order.address}</b> <br>
            Status: <b style="color:green;">${order === null || order === void 0 ? void 0 : order.status}</b> <br>
            .
            `, order.fullname, 'Order Processed');
            (0, mail_1.default)(config_1.default.email, `You have processed this Order. The details for your order are below:<br>
            Order Number: <b>${order === null || order === void 0 ? void 0 : order.orderNo}</b> <br>
            fullname: <b>${order === null || order === void 0 ? void 0 : order.fullname}</b> <br>
            email: <b>$${order === null || order === void 0 ? void 0 : order.email}</b> <br>
            delivery address: <b>${order === null || order === void 0 ? void 0 : order.address}</b> <br>
            Status: <b style="color:green;">${order === null || order === void 0 ? void 0 : order.status}</b> <br>
            `, 'Francis Admin', 'Order Processed');
            res.redirect('/admin/orders');
        })
            .catch(err => console.log(err));
    },
    removeOrder: (req, res, next) => {
        const { id } = req.body;
        orders_1.default.findByPk(id)
            .then(order => {
            return order === null || order === void 0 ? void 0 : order.destroy();
        })
            .then(destroyed => {
            res.redirect('/admin/orders');
        })
            .catch(err => console.log(err));
    }
};
