"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.admin = void 0;
const admin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.redirect('/signin');
    }
    next();
};
exports.admin = admin;
const user = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'user') {
        return res.redirect('/signin');
    }
    next();
};
exports.user = user;
