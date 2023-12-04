"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ejs_1 = __importDefault(require("ejs"));
const root_1 = __importDefault(require("./routes/root"));
const auth_1 = __importDefault(require("./routes/auth"));
const admin_1 = __importDefault(require("./routes/admin"));
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const database_1 = require("./utilities/database");
const config_1 = __importDefault(require("./config"));
const cart_1 = __importDefault(require("./middlewares/cart"));
const sessionStore = new ((0, connect_session_sequelize_1.default)(express_session_1.default.Store))({
    db: database_1.sequelize,
    expiration: 86400000,
});
const connect_flash_1 = __importDefault(require("connect-flash"));
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
app.engine('ejs', ejs_1.default.renderFile);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, connect_flash_1.default)());
app.use((0, express_session_1.default)({
    resave: false,
    secret: config_1.default.session_secret,
    saveUninitialized: false,
    store: sessionStore
}));
sessionStore.sync();
app.use((0, method_override_1.default)('_method'));
app.use(cart_1.default);
app.use('/', root_1.default);
app.use('/auth', auth_1.default);
app.use('/admin', admin_1.default);
exports.default = app;
