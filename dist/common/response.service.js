"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.sendNoData = exports.sendData = exports.send = void 0;
const response_1 = require("./response");
function send(res, response) {
    return res.status(response.status).json(Object.assign({ message: response.message }, response.data));
}
exports.send = send;
function sendData(res, data) {
    return send(res, { status: response_1.HTTTPStatus.OK, data });
}
exports.sendData = sendData;
function sendNoData(res) {
    return res.sendStatus(response_1.HTTTPStatus.NO_CONTENT);
}
exports.sendNoData = sendNoData;
exports.responses = {
    UNAUTHORIZED: { status: response_1.HTTTPStatus.UNAUTHORIZED, message: 'You are not authorized to see this' },
    FORBIDDEN: { status: response_1.HTTTPStatus.FORBIDDEN, message: 'You are not allowed to see this' },
    UNKNOWN_SERVER_ERROR: { status: response_1.HTTTPStatus.INTERNAL_SERVER_ERROR, message: 'Something failed' },
};
//# sourceMappingURL=response.service.js.map