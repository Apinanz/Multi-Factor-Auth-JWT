import { createParamDecorator } from "routing-controllers";
import { Container } from "typedi";

export function RequestScopeContainer() {
    return createParamDecorator({
        required: true,
        value: (action) => {
            const requestId = action.request.headers['x-request-id'];
            return Container.of(requestId);
        },
    });
}