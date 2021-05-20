"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeAPIRoutes = exports.includeMiddlewares = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const security_middleware_1 = __importDefault(require("security/security.middleware"));
function includeMiddlewares(app) {
    //logger.info('Including middlewares');
    app.use('/api/*', body_parser_1.default.urlencoded({ extended: true, limit: '20kb' }));
    app.use('/api/*', body_parser_1.default.json({ limit: '20kb' }));
    app.use(cookie_parser_1.default());
    app.use('*', security_middleware_1.default());
}
exports.includeMiddlewares = includeMiddlewares;
function includeAPIRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all([
            Promise.resolve().then(() => __importStar(require('security/refresh-token/refresh-token.route')))
        ])
            .then((routes) => routes.forEach(({ default: route }) => {
            route(app);
        }));
    });
}
exports.includeAPIRoutes = includeAPIRoutes;
//# sourceMappingURL=api.js.map