"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authcontroller_1 = __importDefault(require("../controller/authcontroller"));
const validation_1 = __importDefault(require("../middlewares/validation"));
router
    .route('/signin')
    .post([validation_1.default.email, validation_1.default.password], authcontroller_1.default.signin);
router
    .route('/logout')
    .get(authcontroller_1.default.signout);
exports.default = router;
