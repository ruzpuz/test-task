"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const security_controller_1 = require("./security.controller");
const HTTP_1 = require("../common/types/HTTP");
const assert_1 = __importDefault(require("assert"));
const security = security_controller_1.Security.get();
function registerTwoRoutes() {
    assert_1.default.throws(() => {
        security.registerSecuredRoute('/api/user/:id', HTTP_1.Method.GET);
        security.registerSecuredRoute('/api/user/:id', HTTP_1.Method.GET);
    });
}
exports.default = () => describe('Testing security services', () => {
    it('Cannot register same route twice', registerTwoRoutes);
});
//# sourceMappingURL=security.test.js.map