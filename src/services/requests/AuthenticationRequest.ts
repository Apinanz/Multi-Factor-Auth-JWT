import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class RegisterRequest {
    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}

export class LogInRequest {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}

export class VerifyRequest {
    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    otp: string

    @IsNotEmpty()
    token: string
}

export class DisableRequest {
    @IsNotEmpty()
    user_id: string
}
