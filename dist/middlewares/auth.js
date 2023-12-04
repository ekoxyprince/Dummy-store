"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
exports.default = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLoggedIn) {
        const id = req.session.user.id;
        users_1.default.findByPk(id)
            .then((user) => {
            if (!user) {
                return res.redirect('/signin');
            }
            req.user = user;
            next();
        })
            .catch(error => console.error(error));
    }
    else {
        res.redirect('/signin');
    }
};
