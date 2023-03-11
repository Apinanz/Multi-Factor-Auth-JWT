"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
let HelloController = class HelloController {
    index() {
        return "hello world!";
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HelloController.prototype, "index", null);
HelloController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/hello')
], HelloController);
exports.HelloController = HelloController;
//# sourceMappingURL=HelloController.js.map