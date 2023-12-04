"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
};
