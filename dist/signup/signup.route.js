"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_service_1 = require("common/response.service");
const signup_controller_1 = require("./signup.controller");
function signupRoute(request, response) {
    const { BAD_REQUEST, NOT_IMPLEMENTED } = response_service_1.responses;
    if (!signup_controller_1.isValid(request.body)) {
        return response_service_1.send(response, BAD_REQUEST);
    }
    return response_service_1.send(response, NOT_IMPLEMENTED);
}
exports.default = (app) => app.post('/api/signup', signupRoute);
//# sourceMappingURL=signup.route.js.map