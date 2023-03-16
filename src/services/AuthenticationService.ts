import { IUser } from "../models/Authentication";
import Container, { Inject, Service } from "typedi";
import { DisableRequest, LogInRequest, RegisterRequest, VerifyRequest } from "./requests/AuthenticationRequest";
import * as uuid from "uuid";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import User from "../models/User";
@Service()
export class AuthenticationService {

    public async register(register: RegisterRequest) {
        try {

            await User.create({
                user_id: uuid.v4(),
                firstname: register.firstname,
                lastname: register.lastname,
                email: register.email,
                password: await bcrypt.hash(register.password, 10),
                created_at: new Date(),
                updated_at: new Date()
            })
            return { register }
        } catch (error) {
            throw error
        }
    }

    public async logIn(logIn: LogInRequest) {
        try {

            const user = await User.findOne({ email: logIn.email })

            if (user) {
                const isPasswordValid = await bcrypt.compare(logIn.password, user.password)
                if (isPasswordValid) {
                    const token = jwt.sign({
                        user_id: user.user_id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                    }, process.env.JWT_SECRET);
                    user.token = token;
                    user.save();
                    return user
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
            const user = await User.findOne({ user_id: verify.user_id });
            if (user) {
                const auth = speakeasy.totp.verify({
                    secret: verify.otp,
                    encoding: 'base32',
                    token: verify.token
                })
                console.log(auth);
                console.log(user.multi_factor);

                if (auth) {
                    if (!user.multi_factor) {
                        await User.updateOne({ user_id: verify.user_id, multi_factor: true, secret: verify.otp })
                        return 'enable multi-factor'
                    }
                    return 'verify multi-factor'
                }
            }
        } catch (error) {
            throw error
        }
    }

    public async disableMultiFactor(disable: DisableRequest) {
        try {
            const user = await User.findOne({ user_id: disable.user_id });
            if (user && user.multi_factor) {
                await User.updateOne({ user_id: disable.user_id, multi_factor: false, secret: null })
                return 'disable multi-factor'
            }
        } catch (error) {
            throw error
        }
    }
}