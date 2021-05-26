"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.Method = exports.Status = void 0;
const path_pattern_1 = require("path-pattern");
var Status;
(function (Status) {
    Status[Status["OK"] = 200] = "OK";
    Status[Status["CREATED"] = 201] = "CREATED";
    Status[Status["NO_CONTENT"] = 204] = "NO_CONTENT";
    Status[Status["FOUND"] = 302] = "FOUND";
    Status[Status["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Status[Status["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    Status[Status["FORBIDDEN"] = 403] = "FORBIDDEN";
    Status[Status["NOT_FOUND"] = 404] = "NOT_FOUND";
    Status[Status["CONFLICT"] = 409] = "CONFLICT";
    Status[Status["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    Status[Status["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
})(Status = exports.Status || (exports.Status = {}));
var Method;
(function (Method) {
    Method["CONNECT"] = "CONNECT";
    Method["DELETE"] = "DELETE";
    Method["GET"] = "GET";
    Method["HEAD"] = "HEAD";
    Method["OPTIONS"] = "OPTIONS";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["TRACE"] = "TRACE";
})(Method = exports.Method || (exports.Method = {}));
class Route {
    constructor(pattern, method) {
        this.method = method;
        this.pattern = pattern;
    }
    matchesMethod(method) {
        return (method === this.method);
    }
    matchesPattern(baseUrl) {
        return !!(new path_pattern_1.PathPatternWithParams(this.pattern)).match(baseUrl);
    }
    isExact(pattern, method) {
        return this.matchesMethod(method) && pattern === this.pattern;
    }
    matches(baseUrl, method) {
        return this.matchesMethod(method) && this.matchesPattern(baseUrl);
    }
}
exports.Route = Route;
//# sourceMappingURL=HTTP.js.map