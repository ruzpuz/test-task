"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const security_controller_1 = require("security/security.controller");
const response_service_1 = require("common/response.service");
function create() {
    return function (req, res, next) {
        const security = security_controller_1.Security.get();
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const halt = security.shouldEndRequest(token, req.baseUrl, req.method);
        if (halt) {
            return response_service_1.send(res, halt);
        }
        next();
    };
}
exports.default = create;
//# sourceMappingURL=security.middleware.js.map