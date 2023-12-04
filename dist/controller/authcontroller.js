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
const express_validator_1 = require("express-validator");
const users_1 = __importDefault(require("../models/users"));
const bcrypt = __importStar(require("bcryptjs"));
exports.default = {
    signin: (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const { email, password } = req.body;
        if (!errors.isEmpty()) {
            return res.json({ success: false, body: { status: "validation error", data: errors.array()[0] } });
        }
        users_1.default.findOne({ where: { email: email } })
            .then((user) => {
            if (!user) {
                return res.json({ success: false, body: { status: "Authentication Error", data: { path: 'email', msg: 'No user found' } } });
            }
            console.log(password, user.password);
            return bcrypt.compare(password, user.password)
                .then((doMatch) => {
                if (!doMatch) {
                    return res.json({ success: false, body: { status: "Authentication Error", data: { path: 'email', msg: 'Incorrect Password' } } });
                }
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.json({ success: true, body: { status: 'Authentication successful', data: { msg: 'Signin successful' } } });
            });
        })
            .catch(error => {
        });
    },
    signout: (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/signin');
            }
        });
    }
};
