import { IUser } from "../models/Authentication";
import { UserRepository } from "../repository/UserRepository";
import Container, { Inject, Service } from "typedi";
import { DisableRequest, LogInRequest, RegisterRequest, VerifyRequest } from "./requests/AuthenticationRequest";
import * as uuid from "uuid";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
@Service()
export class AuthenticationService {
    @Inject()
    private _userRepository: UserRepository

    public async register(register: RegisterRequest) {
        try {
            const user = await this._userRepository.createUser({
                id: uuid.v4(),
                name: register.name,
                email: register.email,
                password: await bcrypt.hash(register.password, 10),
                created_at: new Date(),
                updated_at: new Date()
            } as IUser)
        } catch (error) {
            throw error
        }
    }

    public async logIn(logIn: LogInRequest) {
        try {
            const JWT_SECRET = crypto.randomBytes(64).toString('hex');
            const user = await this._userRepository.getUserByEmail(logIn.email)
            if (user) {
                const isPasswordValid = await bcrypt.compare(logIn.password, user.password)
                if (isPasswordValid) {
                    const token = await jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }, JWT_SECRET);
                    return { ...user, token: token, secert: JWT_SECRET }
                }
            }
        } catch (error) {
            throw error
        }
    }

    public async generateOTP() {
        try {
            const secret = speakeasy.generateSecret();
            const qrCode = qrcode.toDataURL(secret.otpauth_url)
            return { ...secret, qr: qrCode }
        } catch (error) {
            throw error
        }
    }

    public async verifyOTP(verify: VerifyRequest) {
        try {
            const user = await this._userRepository.getUserByUserID(verify.user_id);
            if (user) {
                const auth = speakeasy.totp.verify({
                    secret: verify.otp,
                    encoding: 'base32',
                    token: verify.token
                })
                console.log(auth);
                if (auth) {
                    await this._userRepository.updateMultiFactor(verify.user_id, true, verify.otp)
                    return 'enable multi-factor'
                }
            }
        } catch (error) {
            throw error
        }
    }

    public async disableMultiFactor(disable: DisableRequest) {
        try {
            const user = await this._userRepository.getUserByUserID(disable.user_id);
            console.log(user.multi_factor);

            if (user && user.multi_factor) {
                await this._userRepository.updateMultiFactor(disable.user_id, false, null)
                return 'disable multi-factor'
            }
        } catch (error) {
            throw error
        }
    }
}