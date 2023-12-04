"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    email: (0, express_validator_1.check)('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email').normalizeEmail(),
    password: (0, express_validator_1.body)('password').notEmpty().withMessage('Password field is required').isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters').trim(),
    name: (0, express_validator_1.body)('name').notEmpty().withMessage('Name field is required'),
    category: (0, express_validator_1.body)('category').notEmpty().withMessage('Category field is required'),
    description: (0, express_validator_1.body)('description').notEmpty().withMessage('Description field is required'),
    amount: (0, express_validator_1.body)('price').notEmpty().withMessage('Price field is required')
};
