"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloController_1 = require("controllers/HelloController");
const routing_controllers_1 = require("routing-controllers");
const PORT = 4000;
console.info(`Starting server on http://localhost:${PORT}`);
const routes = [HelloController_1.HelloController]; // To be changed soon
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: routes,
    cors: {
        origin: '*', // (note: do not use this in production)
    }
});
app.listen(PORT);
//# sourceMappingURL=app.js.map