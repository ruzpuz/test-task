"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const security_middleware_1 = require("src/security/security.middleware");
const response_service_1 = require("src/common/response.service");
const security_controller_1 = require("src/security/security.controller");
function refreshTokenRoute(request, response) {
    const { UNAUTHORIZED, FORBIDDEN } = response_service_1.responses;
    const { token } = request.body;
    if (!token) {
        return response_service_1.send(response, UNAUTHORIZED);
    }
    if (!security_middleware_1.refreshTokens.includes(token)) {
        return response_service_1.send(response, FORBIDDEN);
    }
    return response_service_1.send(response, security_controller_1.refreshAccessToken(token));
}
exports.default = (app) => app.get('/api/token', refreshTokenRoute);
//# sourceMappingURL=refresh-token.route.js.map