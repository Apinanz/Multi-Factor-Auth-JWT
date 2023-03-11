import 'reflect-metadata';
import { RequestScopeContainer } from '../decorators/RequestScopeContainerDecorator';
import { Body, HttpCode, JsonController, Post } from "routing-controllers";
import { AuthenticationService } from "../services/AuthenticationService";
import { DisableRequest, LogInRequest, RegisterRequest, VerifyRequest } from "../services/requests/AuthenticationRequest";
import { ContainerInstance } from "typedi";

@JsonController('/api/auth')
export class AuthenticationController {

    @HttpCode(201)
    @Post('/register')
    public register(
        @RequestScopeContainer() container: ContainerInstance,
        @Body() registerRequest: RegisterRequest
    ) {
        try {
            const authenticationService = container.get(AuthenticationService)
            authenticationService.register(registerRequest)
            return registerRequest;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(201)
    @Post('/login')
    public logIn(
        @RequestScopeContainer() container: ContainerInstance,
        @Body() logInRequest: LogInRequest
    ) {
        try {
            const authenticationService = container.get(AuthenticationService)
            const response = authenticationService.logIn(logInRequest)
            return response;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(201)
    @Post('/otp/generate')
    public generate(
        @RequestScopeContainer() container: ContainerInstance,
    ) {
        try {
            const authenticationService = container.get(AuthenticationService)
            const response = authenticationService.generateOTP()
            return response;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(201)
    @Post('/otp/verify')
    public verify(
        @RequestScopeContainer() container: ContainerInstance,
        @Body() verifyRequest: VerifyRequest
    ) {
        try {
            const authenticationService = container.get(AuthenticationService)
            const response = authenticationService.verifyOTP(verifyRequest)
            return response;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(201)
    @Post('/otp/disable')
    public disableMultiFactor(
        @RequestScopeContainer() container: ContainerInstance,
        @Body() disableRequest: DisableRequest
    ) {
        try {
            const authenticationService = container.get(AuthenticationService)
            const response = authenticationService.disableMultiFactor(disableRequest)
            return response;
        } catch (error) {
            throw error;
        }
    }
}