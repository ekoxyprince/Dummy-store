"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rootcontroller_1 = __importDefault(require("../controller/rootcontroller"));
const router = (0, express_1.Router)();
router
    .route('/')
    .get(rootcontroller_1.default.getHome);
router
    .route('/store')
    .get(rootcontroller_1.default.getStore);
router
    .route('/build')
    .get(rootcontroller_1.default.getBuild);
router
    .route('/merch')
    .get(rootcontroller_1.default.getMerch);
router
    .route('/signin')
    .get(rootcontroller_1.default.getSignin);
router
    .route('/cart')
    .post(rootcontroller_1.default.addTocart)
    .patch(rootcontroller_1.default.reduceCartItem);
router
    .route('/order')
    .post(rootcontroller_1.default.placeOrder);
router
    .route('/product/:id')
    .get(rootcontroller_1.default.fetchProductDetails);
exports.default = router;
