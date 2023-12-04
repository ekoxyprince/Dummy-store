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
const carttotal_1 = __importDefault(require("../helpers/carttotal"));
const orders_1 = __importDefault(require("../models/orders"));
const order_items_1 = __importDefault(require("../models/order-items"));
const payment_1 = __importDefault(require("../models/payment"));
const mail_1 = __importDefault(require("../helpers/mail"));
const config_1 = __importDefault(require("../config"));
exports.default = {
    getHome: (req, res, next) => {
        res.render('./pages/home', {
            cart: req.session.cart,
            subtotal: (0, carttotal_1.default)(req.session.cart)
        });
    },
    getStore: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield products_1.default.findAll({ where: { category: 'store' } });
        res.render('./pages/store', {
            products, cart: req.session.cart,
            subtotal: (0, carttotal_1.default)(req.session.cart)
        });
    })),
    getMerch: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield products_1.default.findAll({ where: { category: 'merch' } });
        res.render('./pages/merch', {
            products, cart: req.session.cart,
            subtotal: (0, carttotal_1.default)(req.session.cart)
        });
    })),
    getBuild: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield products_1.default.findAll({ where: { category: 'build' } });
        res.render('./pages/build', {
            products, cart: req.session.cart,
            subtotal: (0, carttotal_1.default)(req.session.cart)
        });
    })),
    getSignin: (req, res, next) => {
        res.render('./auth/signin');
    },
    addTocart: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { prodId } = req.body;
        const cart = req.session.cart;
        const product = yield products_1.default.findByPk(prodId);
        if (!product) {
            return res.json({ success: false, body: { status: "Verification Error", data: { path: 'id', msg: 'No product found' } } });
        }
        const productIndex = cart.findIndex(cart => cart.id === prodId);
        if (productIndex > -1) {
            cart[productIndex].quantity = cart[productIndex].quantity + 1;
            cart[productIndex].price = product.price * cart[productIndex].quantity;
        }
        else {
            const newCartProduct = { id: prodId, price: product.price, name: product.name, image: product.image, quantity: 1 };
            cart.push(newCartProduct);
        }
        res.json({ success: true, body: { status: 'Added Successfully', data: { msg: "Added to cart", cart } } });
    })),
    reduceCartItem: (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { prodId } = req.body;
        const cart = req.session.cart;
        const product = yield products_1.default.findByPk(prodId);
        if (!product) {
            return res.json({ success: false, body: { status: "Verification Error", data: { path: 'id', msg: 'No product found' } } });
        }
        const productIndex = cart.findIndex(cart => cart.id === prodId);
        if (productIndex > -1) {
            cart[productIndex].quantity = cart[productIndex].quantity - 1;
            cart[productIndex].price = product.price * cart[productIndex].quantity;
        }
        if (((_a = cart[productIndex]) === null || _a === void 0 ? void 0 : _a.quantity) === 0) {
            req.session.cart = cart.filter(cart => cart.id !== prodId);
        }
        res.json({ success: true, body: { status: 'Removed Successfully', data: { msg: "Removed from cart", cart } } });
    })),
    fetchProductDetails: (req, res, next) => {
        const { id } = req.params;
        products_1.default.findByPk(id)
            .then((product) => {
            if (!product) {
                return res.json({ success: false, body: { status: "Verification Error", data: { path: 'id', msg: 'No product found' } } });
            }
            res.json({ success: true, body: { status: 'Response successful', data: { msg: "Fetched successfully", product } } });
        })
            .catch(err => console.error(err));
    },
    placeOrder: (req, res, next) => {
        const { cart } = req.session;
        const { name, email, address, category } = req.body;
        const orderNo = Math.floor((Math.random() * 900000) + 100000);
        const total = (0, carttotal_1.default)(req.session.cart);
        if (req.session.cart.length < 1) {
            return res.json({ msg: "Invalid response" });
        }
        orders_1.default.create({
            fullname: name,
            email: email,
            address: address,
            payment: category,
            total: (0, carttotal_1.default)(req.session.cart),
            orderNo: orderNo,
            status: 'pending'
        })
            .then(order => {
            cart.map(c => {
                c.OrderId = order.id;
                c.id = undefined;
            });
            return order_items_1.default.bulkCreate(cart);
        })
            .then(orderItems => {
            req.session.cart = [];
            return payment_1.default.findAll({ where: { category: category } });
        })
            .then(payments => {
            (0, mail_1.default)(email, `We have received your order and will be processed shortly. The details for your order are below:<br>
      Order Number: <b>${orderNo}</b> <br>
      fullname: <b>${name}</b> <br>
      email: <b>${email}</b> <br>
      delivery address: <b>${address}</b> <br>
      Status: <b style="color:red;">Pending</b> <br>
      Kindly send your proof of payment to our email.
      `, name, 'Order Confirmation');
            (0, mail_1.default)(config_1.default.email, `A new order has been placed recently kingly process the order. The details for your order are below:<br>
      Order Number: <b>${orderNo}</b> <br>
      fullname: <b>${name}</b> <br>
      email: <b>${email}</b> <br>
      delivery address: <b>${address}</b> <br>
      Kindly send your proof of payment to our email.
      `, 'Francis Admin', 'Order Confirmation');
            res.render('./pages/payment', {
                payments, cart: req.session.cart
            });
        }).catch(err => console.log(err));
    }
};
