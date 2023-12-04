"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
exports.default = {
    port: process.env.PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    session_secret: process.env.SESSION_SECRET,
    email: process.env.EMAIL,
    email_pass: process.env.EMAIL_PASS,
    email_host: process.env.EMAIL_HOST
};
