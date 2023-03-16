import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const config = process.env;

interface RequestUser extends Request {
    user: string | JwtPayload;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.body?.token || req.query?.token || req?.headers["x-auth-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        (req as RequestUser).user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;