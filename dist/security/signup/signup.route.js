"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_service_1 = require("common/response.service");
const security_controller_1 = require("security/security.controller");
function signupRoute(request, response) {
    const { UNAUTHORIZED, FORBIDDEN } = response_service_1.responses;
    const { token } = request.body;
    const security = security_controller_1.Security.get();
    if (!token) {
        return response_service_1.send(response, UNAUTHORIZED);
    }
    if (!security.canRefreshToken(token)) {
        return response_service_1.send(response, FORBIDDEN);
    }
    return response_service_1.send(response, security_controller_1.Security.refreshAccessToken(token));
}
exports.default = (app) => app.post('/api/signup', signupRoute);
//# sourceMappingURL=signup.route.js.map