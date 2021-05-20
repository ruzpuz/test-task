"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_service_1 = require("common/response.service");
const HTTP_1 = require("common/types/HTTP");
class Security {
    constructor() {
        this.refreshTokens = [];
        this.routes = [];
    }
    static getUser(token) {
        if (!token) {
            return null;
        }
        try {
            return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (error) {
            //log error and
            return null;
        }
    }
    static generateAccessToken(user) {
        return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    }
    static refreshAccessToken(token) {
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = Security.generateAccessToken({ name: user.name });
            return { status: HTTP_1.Status.OK, data: { accessToken } };
        }
        catch (error) {
            //log error and
            return response_service_1.responses.FORBIDDEN;
        }
    }
    canRefreshToken(token) {
        return this.refreshTokens.includes(token);
    }
    shouldEndRequest(token, baseUrl, method) {
        const user = Security.getUser(token);
        const unsecured = !this.routes.find(route => route.matches(baseUrl, method));
        if (unsecured || user) {
            return null;
        }
        return response_service_1.responses.UNAUTHORIZED;
    }
    registerSecuredRoute(pattern, method) {
        if (!this.routes.find(route => route.isExact(pattern, method))) {
            return this.routes.push(new HTTP_1.Route(pattern, method));
        }
        throw new Error('Route already registered');
    }
    static get() {
        if (!this.instance) {
            this.instance = new Security();
        }
        return this.instance;
    }
}
exports.Security = Security;
//# sourceMappingURL=security.controller.js.map