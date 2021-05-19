"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.refreshTokens = void 0;
exports.refreshTokens = [];
function create() {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    };
}
exports.create = create;
//# sourceMappingURL=security.middleware.js.map