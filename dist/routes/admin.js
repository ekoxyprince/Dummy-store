"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const admincontroller_1 = __importDefault(require("../controller/admincontroller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const role_1 = require("../middlewares/role");
const fileupload_1 = __importDefault(require("../middlewares/fileupload"));
const validation_1 = __importDefault(require("../middlewares/validation"));
router
    .route('/dashboard')
    .get([auth_1.default, role_1.admin], admincontroller_1.default.dashboard);
router
    .route('/products')
    .get([auth_1.default, role_1.admin], admincontroller_1.default.product)
    .post([auth_1.default, role_1.admin], [fileupload_1.default.single('file'), validation_1.default.name, validation_1.default.category, validation_1.default.description, validation_1.default.amount], admincontroller_1.default.addProduct)
    .delete([auth_1.default, role_1.admin], admincontroller_1.default.deleteProduct);
router
    .route('/payments')
    .get([auth_1.default, role_1.admin], admincontroller_1.default.getPayment)
    .post([auth_1.default, role_1.admin], admincontroller_1.default.addPayment)
    .delete([auth_1.default, role_1.admin], admincontroller_1.default.removePayment);
router
    .route('/orders')
    .get([auth_1.default, role_1.admin], admincontroller_1.default.getOrders)
    .patch([auth_1.default, role_1.admin], admincontroller_1.default.updateOrder)
    .delete([auth_1.default, role_1.admin], admincontroller_1.default.removeOrder);
router
    .route('/order_details/:id')
    .get([auth_1.default, role_1.admin], admincontroller_1.default.gerOrderDetails);
exports.default = router;
