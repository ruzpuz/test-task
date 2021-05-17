"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const PORT = 3010;
app.set('port', PORT);
function includeAPIRoutes() { }
function includeMiddlewares() {
    //logger.info('Including middlewares');
    app.use('/api/*', body_parser_1.default.urlencoded({ extended: true, limit: '20kb' }));
    app.use('/api/*', body_parser_1.default.json({ limit: '20kb' }));
    app.use(cookie_parser_1.default());
    //app.use('*', security());
}
const server = app.listen(app.get('port'));
includeAPIRoutes();
includeMiddlewares();
exports.default = app;
//# sourceMappingURL=app.js.map