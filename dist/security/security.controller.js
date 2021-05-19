"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_service_1 = require("src/common/response.service");
const response_1 = require("src/common/response");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}
exports.generateAccessToken = generateAccessToken;
function refreshToken(token) {
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({ name: user.name });
        return { status: response_1.HTTTPStatus.OK, data: { accessToken } };
    }
    catch (error) {
        //log error and
        return response_service_1.responses.FORBIDDEN;
    }
}
exports.refreshToken = refreshToken;
//# sourceMappingURL=security.controller.js.map