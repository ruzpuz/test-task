"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.sendNoData = exports.sendData = exports.send = void 0;
const HTTP_1 = require("./types/HTTP");
function send(res, response) {
    return res.status(response.status).json(Object.assign({ message: response.message }, response.data));
}
exports.send = send;
function sendData(res, data) {
    return send(res, { status: HTTP_1.Status.OK, data });
}
exports.sendData = sendData;
function sendNoData(res) {
    return res.sendStatus(HTTP_1.Status.NO_CONTENT);
}
exports.sendNoData = sendNoData;
exports.responses = {
    UNAUTHORIZED: { status: HTTP_1.Status.UNAUTHORIZED, message: 'You are not authorized to access this' },
    FORBIDDEN: { status: HTTP_1.Status.FORBIDDEN, message: 'You are not allowed to see this' },
    BAD_REQUEST: { status: HTTP_1.Status.BAD_REQUEST, message: 'Malformed request' },
    NOT_IMPLEMENTED: { status: HTTP_1.Status.NOT_IMPLEMENTED, message: 'Route under construction' },
    UNKNOWN_SERVER_ERROR: { status: HTTP_1.Status.INTERNAL_SERVER_ERROR, message: 'Something failed' }
};
//# sourceMappingURL=response.service.js.map